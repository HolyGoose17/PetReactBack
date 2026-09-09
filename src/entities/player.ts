import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agent } from './agent';
import { Club } from './club';
import { Role } from './role';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  playerID: number;

  @Column('varchar')
  playerName: string;

  @ManyToOne(() => Club, (club) => club.playersName)
  @JoinColumn({ name: 'clubNameClubID' })
  clubName: Club;

  @ManyToOne(() => Agent, (agent) => agent.playersName)
  @JoinColumn({ name: 'agentNameAgentID' })
  agentName: Agent;

  @ManyToOne(() => Role, (role) => role.roleName)
  @JoinColumn({ name: 'roleNameRoleID' })
  roleName: Role;

  @Column('int')
  playerAge: number;

  @Column('varchar')
  playerNational: string;

  @Column('varchar')
  playerFoot: string;

  @Column('varchar')
  playerSalary: string;

  @Column('varchar')
  path: string;

  @Column('varchar')
  pathWork: string;
}
