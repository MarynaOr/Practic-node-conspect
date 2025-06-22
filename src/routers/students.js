// routers - express-роутери, які будуть використані в застосунку
import { Router } from 'express';

import {
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

export default router;
