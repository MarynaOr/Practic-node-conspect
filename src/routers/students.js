// routers - express-роутери, які будуть використані в застосунку
import { Router } from 'express';

import {
  getStudentsByIdController,
  getStudentsController,
} from '../controllers/student.js';

const router = Router();

router.get('/students', getStudentsController);
router.get(
  '/students/:studentId',
  getStudentsByIdController,
);

export default router;
