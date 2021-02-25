import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { User } from '../users/interfaces/user.interface';
import { LoginUserDTO, UserJWTPayload } from './interfaces/auth.interface';
import { UserDocument } from '../users/models/user.model';

@Service()
class AuthService {
  constructor(@Inject('UserModel') private userModel: Model<UserDocument>) {}

  private generateToken = (user: User) => {
    const payload: UserJWTPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      status: user.status,
    };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 8640000 * 30 });
    return token;
  };

  verifyToken = (token: string) => {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return decoded as UserJWTPayload;
  };

  login = async ({ email, password }: LoginUserDTO) => {
    const userRecord = await this.userModel.findOne({ email }).select('password email');
    if (!userRecord) throw createError(400, 'User Not Registered');

    const validPassword = await bcrypt.compare(password, userRecord.password);

    if (!validPassword) throw createError(400, 'Email or password wrong');

    const user = await this.userModel.findOne({ email });
    const token = this.generateToken(user);

    return { user, token };
  };
}

export default AuthService;
