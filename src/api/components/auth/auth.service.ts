import { UserModelName } from './../users/models/user.model';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import randomize from 'randomatic';
import config from '../../../config';
import { User } from '../users/interfaces/user.interface';
import { PasswordResetStatus, UserJWTPayload } from './interfaces/auth.interface';
import { UserDocument } from '../users/models/user.model';
import LoginUserDTO from './dto/login-user.dto';
import { PasswordResetDocument, PasswordResetModelName } from './models/password-reset.model';
import generateDateRangeFromNow from '../../../utils/generate-date-range-from-now.util';
import { PASSWORD_RESET_CODE_VALID_TIME_IN_MINS } from '../../../constants/auth';

@Service()
class AuthService {
  constructor(
    @Inject(UserModelName) private userModel: Model<UserDocument>,
    @Inject(PasswordResetModelName) private passwordResetModel: Model<PasswordResetDocument>,
  ) {}

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

    // Updating lastLoginedAt is unnecessary here
    // you can update it async with subscribers (eg using messaging queues)
    const [user] = await Promise.all([
      this.userModel.findOne({ email }),
      this.userModel.updateOne({ email }, { lastLoginedAt: new Date() }),
    ]);
    const token = this.generateToken(user);

    return { user, token };
  };

  createCode = async (email: string) => {
    const user = await this.userModel.findOne({ email });

    if (!user) throw createError(400, 'User not found.');

    const code = randomize('0', 6);

    await this.passwordResetModel.updateMany(
      { user: user._id, status: PasswordResetStatus.Valid },
      { status: PasswordResetStatus.Invalid },
    );

    await this.passwordResetModel.create({
      user: user._id,
      code,
      email,
      status: PasswordResetStatus.Valid,
      createdAt: new Date(),
    });

    return code;
  };

  verifyCode = async (email: string, code: string) => {
    const dates = generateDateRangeFromNow(60, PASSWORD_RESET_CODE_VALID_TIME_IN_MINS);
    const passwordReset = await this.passwordResetModel.findOne({
      email,
      status: PasswordResetStatus.Valid,
      createdAt: { $lt: dates.endDate },
    });

    if (!passwordReset) throw createError(400, 'Email verification code not found.');

    if (String(passwordReset.code) !== String(code)) {
      throw createError(400, 'Invalid verification code.');
    }

    await this.passwordResetModel.updateOne(
      { _id: passwordReset.id },
      { status: PasswordResetStatus.Verified },
    );
    return true;
  };

  canChangePassword = async (email: string, code: string) => {
    const dates = generateDateRangeFromNow(60, PASSWORD_RESET_CODE_VALID_TIME_IN_MINS);

    const passwordReset = await this.passwordResetModel.findOne({
      email,
      code,
      status: PasswordResetStatus.Verified,
      createdAt: { $gt: dates.startDate, $lt: dates.endDate },
    });

    if (!passwordReset) throw createError(400, 'Email verification code did not verified.');

    return passwordReset.user;
  };
}

export default AuthService;
