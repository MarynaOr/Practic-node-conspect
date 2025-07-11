import createHttpError from 'http-errors';
import { usersCollection } from '../db/models/user.js';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import {
  FIFTEEN_MINUTES,
  ONE_DAY,
} from '../contacts/index.js';

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

  await SessionCollection.deleteOne({
    userId: user._id,
  });
  const accessToken =
    randomBytes(30).toString('base64');
  const refreshToken =
    randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidation: new Date(
      Date.now() + FIFTEEN_MINUTES,
    ),
    refreshTokenValidation: new Date(
      Date.now() + ONE_DAY,
    ),
  });
};
