import cors from 'cors';
import fileUpload from 'express-fileupload';
import express from 'express';

import routerAgent from './routes/agent.router';
import routerClub from './routes/club.router';
import routerLeague from './routes/league.router';
import routerOwner from './routes/owner.router';
import routerPlayer from './routes/player.router';
import routerPosition from './routes/position.router';
import routerUser from './routes/user.router';
import routerAuth from './routes/auth.router';
import { authMiddleware } from './middlewares/auth.middlewares';
import { AppDataSource } from './config/data-source';

const app = express();

// Настройка CORS и middleware для обработки JSON и загрузки файлов
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
);

// Публичный маршрут, доступен без авторизации
app.use('/api/auth', routerAuth);

// Приватный маршрут, доступен только для авторизованных пользователей
app.use(authMiddleware);
app.use(routerAgent);
app.use(routerClub);
app.use(routerLeague);
app.use(routerOwner);
app.use(routerPlayer);
app.use(routerPosition);
app.use(routerUser);

const PORT = process.env.PORT || 3005;

const runApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    process.exit(1);
  }

  process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(1);
  });
};

runApp();
