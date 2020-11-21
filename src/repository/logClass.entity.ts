import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class LogClassEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  sensorId: string;

  @Column()
  timestamp: number;

  @Column()
  value: number;
}
