import { Injectable } from "@nestjs/common";
import { UARTService } from "./UARTService";
import { LogsRepository } from "./repository/logsRepository.service";

@Injectable()
export class AppService {
  constructor(
    private readonly repository: LogsRepository,
    private readonly uartService: UARTService
  ) {}
  pompWater(valveState: number) {
    this.uartService.pompWater(valveState);
    return { state: "success" };
  }
  getLogs(sensorId: string) {
    return this.repository.getLogs(sensorId);
  }
}
