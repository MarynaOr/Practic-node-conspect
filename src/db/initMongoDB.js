import mongoose from 'mongoose';
import { getEnvVar } from '../module-2/lesson-1/utils/getEnvVar.js';

export const initMongoDB = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      // `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Maryna`,
      `mongodb+srv://${user}:${encodeURIComponent(
        pwd,
      )}@${url}/${db}?retryWrites=true&w=majority&appName=Maryna`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
