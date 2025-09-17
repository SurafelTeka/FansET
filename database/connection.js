import mongoose from 'mongoose';

const defaultUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fanset';

export const connectDatabase = async () => {
  if (!mongoose.connection.readyState) {
    mongoose.set('strictQuery', true);
    await mongoose.connect(defaultUri, {
      serverSelectionTimeoutMS: 5000
    });
  }

  return mongoose.connection;
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
