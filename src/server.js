// server.js - файл, де ми
//  опишемо наш express-сервер

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { initMongoDB } from './db/initMongoDB.js';
import studentRouter from './routers/students.js';
import { errorHandler } from './middlewares/errorHandlers.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

await initMongoDB();
dotenv.config();
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

  app.get('/', (req, res) => {
    res.json({
      message: `Hello World! ${new Date().toLocaleString()}`,
    });
  });

  app.use(studentRouter);

  app.get('/id/', (req, res) => {
    res.json({
      id: 5,
    });
  });
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(
      `Server is running on port http://localhost:${PORT}`,
    );
  });
};
