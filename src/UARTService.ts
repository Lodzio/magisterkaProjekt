import { Serial } from "raspi-serial";

export class UARTService {
  serial = null;
  message = "";
  constructor() {
    this.serial = new Serial({ portId: "/dev/serial0" });
    this.serial.open(() => {
      this.serial.on("data", this.onData);
    });
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
      console.log("done", this.message);
      this.message = "";
    }
    console.log("wip", this.message);
    // const { s1, s2 } = JSON.parse(data);
    // console.log({ s1, s2 });
  };
}
