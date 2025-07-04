// Метод find() для пошуку документів у MongoDB

// Метод findById()  для пошуку одного документа

import { SORT_ORDER } from '../contacts/index.js';
import { StudentsCollection } from '../db/models/students.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollection.find();
  const studentsCount =
    await StudentsCollection.find()
      .merge(studentsQuery)
      .countDocuments();

  const students = await studentsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(
    studentsCount,
    perPage,
    page,
  );

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentId = async (studentId) => {
  const student =
    await StudentsCollection.findById(studentId);
  return student;
};

export const createStudents = async (payload) => {
  const student = await StudentsCollection.create(
    payload,
  );
  return student;
};

export const deleteStudent = async (
  studentId,
) => {
  const student =
    await StudentsCollection.findOneAndDelete({
      _id: studentId,
    });
  return student;
};

export const updateStudent = async (
  studentId,
  payload,
  options = {},
) => {
  const rawResult =
    await StudentsCollection.findOneAndUpdate(
      { _id: studentId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(
      rawResult?.lastErrorObject?.upserted,
    ),
  };
};
