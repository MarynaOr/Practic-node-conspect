import createHttpError from 'http-errors';
import { usersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const user = await usersCollection.findOne({
    email: payload.email,
  });
  if (user)
    throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(
    payload.password,
    10,
  );
  return await usersCollection.create({
    payload,
    password: encryptedPassword,
  });
};

export const userLogin = async (payload) => {
  const user = await usersCollection.findOne({
    email: payload.email,
  });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isEquel = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isEquel) {
    throw createHttpError(401, 'Unauthorized');
  }
};
