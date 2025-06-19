// server.js - файл, де ми
//  опишемо наш express-сервер

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { initMongoDB } from './db/initMongoDB.js';
import {
  getAllStudents,
  getStudentId,
} from './module-2/lesson-1/services/students.js';

await initMongoDB();
// import { getEnvVar } from './module-2/lesson-1/utils/getEnvVar.js';
dotenv.config();
// const PORT = Number(getEnvVar('PORT', '3000'));
const PORT = Number(process.env.PORT);

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //   app.use((req, res) => {
  //     res.json({ message: `поточна дата: ${new Date().toLocaleString()}` });
  //   });

  app.get('/', (req, res) => {
    res.json({
      message: `Hello World! ${new Date().toLocaleString()}`,
      //   message: [{}],
    });
  });
  app.get('/id/', (req, res) => {
    res.json({
      id: 5,
    });
  });

  app.get('/student', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  });

  app.get(
    '/students/:studentId',
    async (req, res, next) => {
      const { studentId } = req.params;
      const student = await getStudentId(
        studentId,
      );

      if (!student) {
        res.status(404).json({
          message: 'Student not found',
        });
      }
      res.status(200).json({
        dat: student,
      });
      return;
    },
  );

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not a found',
    });
    next();
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(
      `Server is running on port http://localhost:${PORT}`,
    );
  });
};
