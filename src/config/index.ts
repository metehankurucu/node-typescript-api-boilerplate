import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
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
    PREFIX: '/api',
  },

  /**
   * Email of initial admin
   */
  ADMIN_ACCOUNT_EMAIL: process.env.ADMIN_ACCOUNT_EMAIL,

  /**
   * Password of initial admin
   */
  ADMIN_ACCOUNT_PASSWORD: process.env.ADMIN_ACCOUNT_PASSWORD,
};
