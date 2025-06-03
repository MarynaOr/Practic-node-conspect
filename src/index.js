import express from 'express';

const app = express();
const port = 3000;

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
  });
});

app.listen(port, () => {
  console.log(`Server is runing on port http://localhost:${port}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// node src/index.js
