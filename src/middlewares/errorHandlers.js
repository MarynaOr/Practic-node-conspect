// middlewares - кастомні мідлвари
import { HttpError } from 'http-errors';
export const errorHandler = (
  error,
  req,
  res,
  next,
) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.name,
      data: error,
    });
    return;
  }
  res.json({
    status: 500,
    message: 'Щось піщло не так',
    error: error.message,
  });
};
