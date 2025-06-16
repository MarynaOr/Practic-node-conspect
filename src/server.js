// server.js - файл, де ми
//  опишемо наш express-сервер

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
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
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};
