import dotenv from 'dotenv';

import { Agent } from '@/entities/agent.entity';
import { DataSource } from 'typeorm';
import { Club } from '@/entities/club.entity';
import { League } from '@/entities/league.entity';
import { Owner } from '@/entities/owner.entity';
import { Player } from '@/entities/player.entity';
import { Position } from '@/entities/position.entity';
import { User } from '@/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'football_management',
  entities: [Agent, Club, League, Owner, Player, Position, User],
  synchronize: false,
  logging: ['error'],
});
