import createHttpError from 'http-errors';

export const validateBody =
  (schema) => async (req, res, next) => {
    try {
      await schema.validsteAsync(req.body, {
        abortEarly: false,
      });
    } catch (err) {
      const error = createHttpError(
        400,
        'Bad Request',
        {
          arrors: err.details,
        },
      );
      next(error);
    }
  };
