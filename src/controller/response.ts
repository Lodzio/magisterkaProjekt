import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PompWaterResponse {
  @ApiProperty()
  state: string;
}
