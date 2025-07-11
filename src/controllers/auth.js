import { ONE_DAY } from '../contacts/index.js';
import {
  registerUser,
  userLogin,
} from '../services/auth.js';

export const registerUserController = async (
  req,
  res,
) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (
  req,
  res,
) => {
  const session = await userLogin(req.body);
  res.cookie(
    'refreshToken',
    session.refreshToken,
    {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    },
  );
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    exppires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
