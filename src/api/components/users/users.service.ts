import { Model } from 'mongoose';
import { Inject, Service } from 'typedi';
import bcrypt from 'bcryptjs';
import { UserDocument } from './models/user.model';
import { CreateUserDTO } from './interfaces/user.interface';

@Service()
class UsersService {
  constructor(@Inject('UserModel') private userModel: Model<UserDocument>) {}

  findOne = async (params: { _id?: string; email?: string }): Promise<UserDocument> => {
    if (!params._id && !params.email) throw new Error('_id or email must be passed');
    const user = await this.userModel.findOne(params).exec();
    return user;
  };

  findAll = async (): Promise<UserDocument[]> => {
    const users = await this.userModel.find().exec();
    return users;
  };

  create = async (createUserDTO: CreateUserDTO) => {
    const newUser = {
      ...createUserDTO,
      password: bcrypt.hashSync(createUserDTO.password, 12),
      createdAt: new Date(),
    };
    const user = (await this.userModel.create(newUser)).toObject();
    Reflect.deleteProperty(user, 'password');
    return user;
  };
}

export default UsersService;
