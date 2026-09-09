import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column('text')
  login: string;

  @Column('text')
  password: string;

  @Column('boolean')
  isDeleted: boolean;

  @Column('text')
  role: string;
}
