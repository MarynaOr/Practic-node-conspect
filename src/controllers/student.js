// controllers - контролери

import createHttpError from 'http-errors';
import {
  getAllStudents,
  getStudentId,
} from '../services/students.js';

export const getStudentsController = async (
  req,
  res,
  next,
) => {
  try {
    const students = await getAllStudents();
    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentsByIdController = async (
  req,
  res,
  next,
) => {
  const { studentId } = req.params;
  const student = await getStudentId(studentId);

  if (!student) {
    throw createHttpError(
      404,
      'Student not found',
    );
  }
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
