import { Injectable } from "@nestjs/common";
import { LogClassEntity } from "./logClass.entity";
import { InsertResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LogsRepository {
  constructor(
    @InjectRepository(LogClassEntity)
    private readonly repository: Repository<LogClassEntity>
  ) {}

  createLog(value: number, sensorId: string): Promise<InsertResult> {
    const timestamp = new Date().getTime();
    const log = { value, timestamp, sensorId };
    return this.repository.insert(log);
  }

  getLogs(sensorId: string): Promise<LogClassEntity[]> {
    console.log(sensorId);
    this.repository.find().then(console.log);
    return this.repository.find({ where: { sensorId } });
  }
}
