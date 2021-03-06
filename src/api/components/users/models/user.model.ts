import mongoose from 'mongoose';
import { UserStatuses, UserRoles } from '../../../../constants';
import { UserStatus, UserRole } from '../../../../constants/enums';
import { User } from '../interfaces/user.interface';

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  status: {
    type: Number,
    enum: UserStatuses,
    default: UserStatus.Active,
  },
  role: {
    type: Number,
    enum: UserRoles,
    default: UserRole.Normal,
    required: true,
  },
  lastLoginedAt: {
    type: Date,
    default: null,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

export type UserDocument = User & mongoose.Document;

const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export default UserModel;

// Required exports to load model automatically to dependency injector
// use modelName in every model file
export const modelName = 'UserModel';
// arbitrary name
// must be same to use injecting
export const UserModelName = modelName;
