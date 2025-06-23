// controllers - контролери

import createHttpError from 'http-errors';
import {
  createStudents,
  deleteStudent,
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

export const createStudentControler = async (
  req,
  res,
) => {
  const student = await createStudents(req.body);

  res.status(201).json({
    status: 201,
    message: 'Успішне створення студента!',
    data: student,
  });
};

export const deleteStudentController = async (
  req,
  res,
  next,
) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);
  if (!student) {
    next(
      createHttpError(
        404,
        'Такого студента не існує',
      ),
    );
    return;
  }
  res.status(204).send();
};
