// routers - express-роутери, які будуть використані в застосунку
import { Router } from 'express';

import {
  createStudentControler,
  deleteStudentController,
  getStudentsByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/student.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createStudentSchema } from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get(
  '/',
  ctrlWrapper(getStudentsController),
);
router.get(
  '/:studentId',
  isValidId,
  ctrlWrapper(getStudentsByIdController),
);

// router.post(
//   'students',
//   ctrlWrapper(createStudentControler),
// );

router.delete(
  '/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);

// router.put(
//   '/students/:studentId',
//   ctrlWrapper(upsertStudentController),
// );

router.patch(
  '/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(patchStudentController),
);

router.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentControler),
);
router.put(
  '/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

export default router;
