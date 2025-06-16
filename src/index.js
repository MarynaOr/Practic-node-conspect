// index.js - файл, з якого буде починатися виконання нашої програми

// import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

// const bootstrap = async () => {
//   try {
//     await initMongoDB();

//     startServer();
//   } catch (error) {
//     console.error('Bootstrap error:', error);
//   }
//   //   await initMongoDB();

//   //   startServer();
// };

// bootstrap();
startServer();
