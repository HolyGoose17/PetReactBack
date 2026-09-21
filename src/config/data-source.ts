import dotenv from 'dotenv';

import { Agent } from 'http';
import { DataSource } from 'typeorm';
import { Club } from '../entities/club';
import { League } from '../entities/league';
import { Owner } from '../entities/owner';
import { Player } from '../entities/player';
import { Position } from '../entities/position';
import { User } from '../entities/user';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'football_management',
  entities: [Agent, Club, League, Owner, Player, Position, User],
  synchronize: true,
  logging: ['error'],
});
