// routers - express-роутери, які будуть використані в застосунку
import { Router } from 'express';

import {
  createStudentControler,
  deleteStudentController,
  getStudentsByIdController,
  getStudentsController,
} from '../controllers/student.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get(
  '/students',
  ctrlWrapper(getStudentsController),
);
router.get(
  '/students/:studentId',
  ctrlWrapper(getStudentsByIdController),
);

router.post(
  'students',
  ctrlWrapper(createStudentControler),
);

router.delete(
  '/student/:studentId',
  ctrlWrapper(deleteStudentController),
);

export default router;
