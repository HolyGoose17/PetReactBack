import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Agent } from '@/entities/agent.entity';
import { Club } from '@/entities/club.entity';
import { Position } from '@/entities/position.entity';
import { BaseEntity } from '@/entities/base.entity';

export enum PreferredFoot {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BOTH = 'BOTH',
}

export enum SalaryCurrency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}

@Entity('players')
export class Player extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 100 })
  nationality: string;

  @Column({ type: 'enum', enum: PreferredFoot })
  preferredFoot: PreferredFoot;

  @Column({ type: 'int' })
  salary: number;

  @Column({ type: 'enum', enum: SalaryCurrency })
  salaryCurrency: SalaryCurrency;

  @Column({ type: 'varchar', length: 255 })
  photoPath: string;

  @ManyToOne(() => Agent, (agent) => agent.players, { nullable: true })
  @JoinColumn({ name: 'agent_id' })
  agent: Agent | null;

  @ManyToOne(() => Club, (club) => club.players, { nullable: true })
  @JoinColumn({ name: 'club_id' })
  club: Club | null;

  @ManyToOne(() => Position, (position) => position.players, {
    nullable: false,
  })
  @JoinColumn({ name: 'position_id' })
  position: Position;
}
