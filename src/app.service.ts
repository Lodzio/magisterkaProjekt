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
  movingAverage(logs) {
    const N = 36;
    const emptyArray = [...Array(N)];
    const alpha = 2 / (N + 1);
    return logs.map((log, index, array) => {
      let nominator = 0;
      let denominator = 0;
      emptyArray.forEach((_, i) => {
        const p = index - i < 0 ? 0 : array[index - i].value;
        const a = index - i < 0 ? 0 : Math.pow(1 - alpha, i);
        nominator += a * p;
        denominator += a;
      });
      return { ...log, value: nominator / denominator };
    });
  }
}
