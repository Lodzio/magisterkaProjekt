import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PompWaterRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  valveState: number;
}

export class GetLogsRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
