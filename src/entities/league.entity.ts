import { Column, Entity, OneToMany } from 'typeorm';
import { Club } from './club.entity';
import { BaseEntity } from './base.entity';

@Entity('leagues')
export class League extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  logoPath: string;

  @OneToMany(() => Club, (club) => club.league)
  clubs: Club[];
}
