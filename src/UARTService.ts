import { Serial } from "raspi-serial";

export class UARTService {
  serial = null;
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
    console.log(data);
    // const { s1, s2 } = JSON.parse(data);
    // console.log({ s1, s2 });
  };
}
