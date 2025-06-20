import {
  getAllStudents,
  getStudentId,
} from '../services/students.js';

// controllers - контролери
export const getStudentsController = async (
  req,
  res,
) => {
  const students = await getAllStudents();
  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentsByIdController = async (
  req,
  res,
) => {
  const { studentId } = req.params;
  const student = await getStudentId(studentId);

  if (!student) {
    res.status(404).json({
      message: 'Student not found',
    });
    return;
  }
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
