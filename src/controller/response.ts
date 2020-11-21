import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PompWaterResponse {
  @ApiProperty()
  state: string;
}

export class GetLogsResponse {
  @ApiProperty()
  timestamp: number;

  @ApiProperty()
  value: number;
}
