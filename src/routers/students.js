// routers - express-роутери, які будуть використані в застосунку
import { Router } from 'express';
import {
  getAllStudents,
  getStudentId,
} from '../services/students.js';

const router = Router();

router.get(
  '/students',
  async (req, res, next) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  },
);
router.get(
  '/students/:studentId',
  async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentId(studentId);
    if (!student) {
      res
        .status(404)
        .json({ message: 'Student not found' });
    }
    res.status(200).json({
      data: student,
    });
    return;
  },
);

export default router;
