const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Вбудований парсер для JSON-запитів
const applicationController = require('./controllers/applictionController.js'); // Імпортуємо контролер

// Роут – тут ми приймаємо POST-запит на подачу заявки
app.post('/apply', applicationController.handleApplication);

// Запускаємо сервер
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// node index.js
