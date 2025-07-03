// controllers - контролери

import createHttpError from 'http-errors';
import {
  createStudents,
  deleteStudent,
  getAllStudents,
  getStudentId,
  updateStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getStudentsController = async (
  req,
  res,
  next,
) => {
  const { page, perPage } = parsePaginationParams(
    req.query,
  );

  const { sortBy, sortOrder } =
    parsePaginationParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
  });
  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
  // try {
  //   const students = await getAllStudents();
  //   res.json({
  //     status: 200,
  //     message: 'Successfully found students!',
  //     data: students,
  //   });
  // } catch (error) {
  //   next(error);
  // }
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
export const upsertStudentController = async (
  req,
  res,
  next,
) => {
  const { studentId } = req.params;

  const result = await updateStudent(
    studentId,
    req.body,
    {
      upsert: true,
    },
  );

  if (!result) {
    next(
      createHttpError(404, 'Student not found'),
    );
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};

export const patchStudentController = async (
  req,
  res,
  next,
) => {
  const { studentId } = req.params;
  const result = await updateStudent(
    studentId,
    req.body,
  );

  if (!result) {
    next(
      createHttpError(404, 'Student not found'),
    );
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
