import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { Agent } from '@/entities/agent.entity';
import { Club } from '@/entities/club.entity';
import { League } from '@/entities/league.entity';
import { Owner } from '@/entities/owner.entity';
import { Player } from '@/entities/player.entity';
import { Position } from '@/entities/position.entity';
import { User } from '@/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'football_managment',
  entities: [Agent, Club, League, Owner, Player, Position, User],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true, // Включите синхронизацию только в режиме разработки
  logging: ['error'],
});
