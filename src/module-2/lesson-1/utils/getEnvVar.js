import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultVAlue) {
  const value = process.env[name];

  if (value) return value;
  if (defaultVAlue) return defaultVAlue;

  throw new Error(
    `Missing: process.env['${name}']`,
  );
}

// Використати її ми можемо, наприклад,
// в такому вигляді: env('PORT', '3000');
// Якщо змінної оточення з такою назвою
// не було вказано і не було передано дефолтного значення,
// то виклик цієї функції викине помилку
// з повідомленням Missing: process.env['PORT'].
