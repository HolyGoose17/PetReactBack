import cors from 'cors';
import fileUpload from 'express-fileupload';
import express from 'express';
import {
  createConnection,
  getConnection,
  getMetadataArgsStorage,
} from 'typeorm';

import routerAgent from './routes/agent.router';
import routerClub from './routes/club.router';
import routerLeague from './routes/league.router';
import routerOwner from './routes/owner.router';
import routerPlayer from './routes/player.router';
import routerRole from './routes/role.router';
import routerUser from './routes/user.router';
import routerAuth from './routes/auth.router';
import { authMiddleware } from './middlewares/auth.middlewares';
import { Agent } from './entities/agent';
import { Club } from './entities/club';
import { League } from './entities/league';
import { Owner } from './entities/owner';
import { Player } from './entities/player';
import { Role } from './entities/role';
import { Users } from './entities/user';
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
app.use(routerRole);
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
        if(AppDataSource.isInitialized) {
          await AppDataSource.destroy();
        }
        process.exit(1);
      });
};

runApp();
