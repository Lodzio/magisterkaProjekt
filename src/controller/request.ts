import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class PompWaterRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  valveState: number;
}
