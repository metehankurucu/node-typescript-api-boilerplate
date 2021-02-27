import { Model } from 'mongoose';
import createError from 'http-errors';
import { Inject, Service } from 'typedi';
import bcrypt from 'bcryptjs';
import { UserDocument } from './models/user.model';
import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import UpdateCurrentUserDTO from './dto/update-current-user.dto';
import GetUsersDTO from './dto/get-users.dto';

@Service()
class UsersService {
  constructor(@Inject('UserModel') private userModel: Model<UserDocument>) {}

  findOne = async (params: { _id?: string; email?: string }): Promise<UserDocument> => {
    if (!params._id && !params.email) throw new Error('_id or email must be passed');
    const user = await this.userModel.findOne(params).exec();
    return user;
  };

  findAll = async ({ offset = 0, limit = 50 }: GetUsersDTO): Promise<UserDocument[]> => {
    const users = await this.userModel
      .find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: 'desc' })
      .exec();
    return users;
  };

  create = async (createUserDTO: CreateUserDTO) => {
    const newUser = {
      ...createUserDTO,
      password: this.hashPassword(createUserDTO.password),
      createdAt: new Date(),
    };
    const user = (await this.userModel.create(newUser)).toObject();
    Reflect.deleteProperty(user, 'password');
    return user;
  };

  update = async (
    id: string,
    updateUserDTO: UpdateCurrentUserDTO | UpdateUserDTO,
  ): Promise<UserDocument> => {
    const params = {
      ...updateUserDTO,
      updatedAt: new Date(),
    };

    if (params.email) {
      const exist = await this.userModel.findOne({ email: params.email });
      if (exist) throw createError(400, 'Email exist already');
    }

    if (params.password) {
      params.password = this.hashPassword(params.password);
    }

    await this.userModel.updateOne({ _id: id }, params).exec();
    return this.findOne({ _id: id });
  };

  delete = async (id: string) => {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id }).exec();
    return deletedCount === 1;
  };

  private hashPassword = (password: string) => bcrypt.hashSync(password, 12);
}

export default UsersService;
