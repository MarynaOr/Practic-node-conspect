// utils - різні функції, які допомагатимуть
// нам робити певні перетворення чи маніпуляції
export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
