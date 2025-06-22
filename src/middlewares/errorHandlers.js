// middlewares - кастомні мідлвари

export const errorHandler = (
  error,
  req,
  res,
  next,
) => {
  res.jason({
    status: 500,
    message: 'Щось піщло не так',
    error: error.message,
  });
};
