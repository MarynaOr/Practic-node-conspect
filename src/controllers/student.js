import {
  getAllStudents,
  getStudentId,
} from '../services/students.js';

// controllers - контролери
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
    next(new Error('Student not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
