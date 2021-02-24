import mongoose from 'mongoose';
import config from '../config';

export default async () => {
  const connection = await mongoose.connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  return connection.connection;
};
