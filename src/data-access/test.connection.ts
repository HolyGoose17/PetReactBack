import { Agent } from "../entities/agent";
import { Club } from "../entities/club";
import { League } from "../entities/league";
import { Owner } from "../entities/owner";
import { Player } from "../entities/player";
import { Role } from "../entities/role";
import { DataSource } from "typeorm";

export const TestConection = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '*XQ%60dc',
    database: 'football_management',
    entities: [
        Agent, Club, League, Owner, Player, Role,
    ],
    synchronize: true,
    logging: false,
})