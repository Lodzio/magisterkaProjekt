import { Serial } from "raspi-serial";
import { Injectable } from "@nestjs/common";
import { LogsRepository } from "./repository/logsRepository.service";

@Injectable()
export class UARTService {
  serial = null;
  message = "";
  constructor(private readonly repository: LogsRepository) {
    this.serial = new Serial({ portId: "/dev/serial0" });
    this.serial.open(() => {
      this.serial.on("data", this.onData);
    });

    // setInterval(() => this.onData(JSON.stringify({ s1: 0.6, s2: 0.6 })), 5000);
  }

  public pompWater = (valveState: number) => {
    this.serial.write(`f:${valveState}`);
  };

  private onData = (data) => {
    const partOfMessage = String(data);
    if (partOfMessage.charAt(0) !== "{" && this.message.charAt(0) !== "{") {
      return;
    } else {
      this.message += partOfMessage;
    }
    if (this.message.slice(-1) === "}") {
      try {
        const { s1, s2 } = JSON.parse(this.message);
        this.repository.createLog(s1, "s1");
        this.repository.createLog(s2, "s2");
      } catch (error) {
        console.error(error, this.message);
      }
      this.message = "";
    }
  };
}
