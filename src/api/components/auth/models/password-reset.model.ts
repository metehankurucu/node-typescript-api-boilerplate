import mongoose from 'mongoose';
import { PasswordReset, PasswordResetStatus } from '../interfaces/auth.interface';

const PasswordResetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: PasswordResetStatus.Valid,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export type PasswordResetDocument = PasswordReset & mongoose.Document;

const PasswordResetModel = mongoose.model<PasswordResetDocument>(
  'PasswordReset',
  PasswordResetSchema,
);

export default PasswordResetModel;
