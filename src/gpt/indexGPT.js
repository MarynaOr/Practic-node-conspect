const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Вбудований парсер для JSON-запитів
const applicationController = require('./controllers/applicationController'); // Імпортуємо контролер

// Роут – тут ми приймаємо POST-запит на подачу заявки
app.post('/apply', applicationController.handleApplication);
app.get('/', (req, res) => {
  res.send('Сервер працює!');
});
// Запускаємо сервер
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// node src/gpt/index.js
