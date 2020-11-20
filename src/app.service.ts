import { Injectable } from "@nestjs/common";
import { Repository } from "./repository/repository";
import { UARTService } from "./UARTService";

@Injectable()
export class AppService {
  constructor(
    private readonly repository: Repository,
    private readonly uartService: UARTService
  ) {}
  pompWater(valveState: number) {
    this.uartService.pompWater(valveState);
    return { state: "success" };
    // return this.repository.createLog({ timestamp, valveState });
  }
}
