import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Server's Base URL
   */
  BASE_URL: process.env.BASE_URL,

  /**
   * Running Port
   */
  PORT: parseInt(process.env.PORT, 10) || 3000,

  /**
   * MONGODB Connection URI
   */
  MONGODB_URI: process.env.MONGODB_URI,

  /**
   * JWT Secret
   */
  JWT_SECRET: process.env.JWT_SECRET,

  /**
   * API configs
   */
  API: {
    PREFIX: {
      V1: '/api',
    },
  },

  /**
   * Default admin account
   */
  ADMIN_ACCOUNT: {
    EMAIL: process.env.ADMIN_ACCOUNT_EMAIL,
    PASSWORD: process.env.ADMIN_ACCOUNT_PASSWORD,
  },

  /**
   * Email config
   */
  EMAIL: {
    PORT: process.env.EMAIL_PORT,
    HOST: process.env.EMAIL_HOST,
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },

  /**
   * Monitor Config
   */
  MONITOR: {
    ENABLED: process.env.MONITOR_ENABLED === 'true',
    USERNAME: process.env.MONITOR_USERNAME,
    PASSWORD: process.env.MONITOR_PASSWORD,
    ROUTE: process.env.MONITOR_ROUTE || '/status',
  },
};
