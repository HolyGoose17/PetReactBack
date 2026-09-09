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

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
);

const runApp = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '*XQ%60dc',
      database: 'football_management',
      entities: [Agent, Club, League, Owner, Player, Role, Users],
      synchronize: true,
      logging: ['error'],
    });

    process.on('uncaughtException', async (err) => {
      await getConnection().close();
      process.exit(1);
    });

    console.log(getMetadataArgsStorage().tables.map((t) => t.name));

    app.use('/uploads', express.static('uploads'));
    app.use(cors());
    app.use(express.json());
    app.use(authMiddleware);
    app.use(routerAgent);
    app.use(routerAuth);
    app.use(routerClub);
    app.use(routerLeague);
    app.use(routerOwner);
    app.use(routerPlayer);
    app.use(routerRole);
    app.use(routerUser);

    app.listen('3005', () => console.log('Server is running'));
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};

runApp();
