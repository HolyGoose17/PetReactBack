import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity()
export class Agent extends BaseEntity {
    @PrimaryGeneratedColumn()
    agentID: number;

    @Column('varchar')
    agentName: string;

    @OneToMany(() => Player, (player) => player.agentName)
    playersName: Player[];
    
}