// index.js - файл, з якого буде починатися виконання нашої програми

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// node src/index.js
