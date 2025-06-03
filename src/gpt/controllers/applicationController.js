// Імпортуємо бізнес-логіку (сервіс)

const applicationService = require('../services/applicationService.js');

// Контролер отримує запит, валідує та передає у бізнес-логіку
exports.handleApplication = (req, res) => {
  const { name, age } = req.body;

  // Проста перевірка – чи є всі дані
  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  // Викликаємо бізнес-логіку
  const eligible = applicationService.checkEligibility(age);

  // Відправляємо відповідь
  if (eligible) {
    res.json({ message: `${name}, you are eligible for assistance.` });
  } else {
    res.json({ message: `${name}, unfortunately, you are not eligible.` });
  }
};
