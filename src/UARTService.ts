// import { Serial } from "raspi-serial";
import { Repository } from "./repository/repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UARTService {
  serial = null;
  message = "";
  constructor(private readonly repository: Repository) {
    // this.serial = new Serial({ portId: "/dev/serial0" });
    // this.serial.open(() => {
    //   this.serial.on("data", this.onData);
    // });

    setInterval(() => this.onData(JSON.stringify({ s1: 0.6, s2: 0.6 })), 5000);
  }

  public pompWater = (valveState: number) => {
    // this.serial.write(`f:${valveState}`);
  };

  private onData = async (data) => {
    const partOfMessage = String(data);
    if (partOfMessage.charAt(0) !== "{" && this.message.charAt(0) !== "{") {
      return;
    } else {
      this.message += partOfMessage;
    }
    if (this.message.slice(-1) === "}") {
      try {
        const { s1, s2 } = JSON.parse(this.message);
        await this.repository.createLog(s1, "s1");
        await this.repository.createLog(s2, "s2");
      } catch (error) {
        console.error(error, this.message);
      }
      this.message = "";
    }
  };
}
