import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/entities/base.entity';
import { Club } from '@/entities/club.entity';

@Entity('leagues')
export class League extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  logoPath: string;

  @OneToMany(() => Club, (club) => club.league)
  clubs: Club[];
}
