import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column('varchar', { length: 255, unique: true })
  login: string;

  @Column('varchar', { length: 255 })
  password: string;

  @Column('boolean')
  isDeleted: boolean;

  @Column('varchar', { length: 25 })
  role: string;
}
