// Метод find() для пошуку документів у MongoDB

// Метод findById()  для пошуку одного документа

import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  const students =
    await StudentsCollection.find();
  return students;
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
