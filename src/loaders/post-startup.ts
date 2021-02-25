import { Model } from 'mongoose';
import { Container } from 'typedi';
import { hashSync } from 'bcryptjs';
import { Logger } from 'winston';
import config from '../config';
import { UserDocument } from '../api/components/users/models/user.model';
import { UserStatus, UserRole } from '../constants/enums';

const initializeAdmin = async () => {
  const logger: Logger = Container.get('logger');

  if (!config.ADMIN_ACCOUNT_EMAIL || !config.ADMIN_ACCOUNT_PASSWORD) {
    logger.warn('Default admin account email or password does not specified in .env file.');
    return;
  }

  const userModel: Model<UserDocument> = Container.get('UserModel');
  const adminExist = await userModel.findOne({ email: config.ADMIN_ACCOUNT_EMAIL });

  if (adminExist) {
    logger.info(`Default admin account found with ${config.ADMIN_ACCOUNT_EMAIL} email.`);
    return;
  }

  await userModel.create({
    email: config.ADMIN_ACCOUNT_EMAIL,
    password: hashSync(config.ADMIN_ACCOUNT_PASSWORD, 12),
    role: UserRole.SuperAdmin,
    status: UserStatus.Active,
    createdAt: new Date(),
  });
  logger.info(`Default admin account created with ${config.ADMIN_ACCOUNT_EMAIL} email.`);
};

/**
 * Initialize needed things after startup
 * Must be call after dependency injector loaded
 */
export default async () => {
  await initializeAdmin();
};
