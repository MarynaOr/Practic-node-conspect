import mongoose from 'mongoose';
import { getEnvVar } from '../module-2/lesson-1/utils/getEnvVar.js';
import { ENV_VARS } from '../module-2/lesson-1/constants/constants.js';

export const initMongoDB = async () => {
  const user = getEnvVar(ENV_VARS.MONGO_DB_USER);
  const pwd = getEnvVar(
    ENV_VARS.MONGO_DB_PASSWORD,
  );
  const url = getEnvVar(ENV_VARS.MONGO_DB_HOST);
  const db = getEnvVar(
    ENV_VARS.MONGO_DB_DATABASE,
  );
  const uri = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Maryna`;

  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.command({
      ping: 1,
    });

    console.log(
      'Mongo connection successfully established!',
    );
  } catch (error) {
    console.log(
      'Error while setting up mongo connection',
      error,
    );
    throw error;
  }
};
