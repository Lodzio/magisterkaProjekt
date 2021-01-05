import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { ApiBody, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { AppService } from "../app.service";
import { PompWaterRequest } from "./request";
import { GetLogsResponse, PompWaterResponse } from "./response";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("pompWater")
  @ApiBody({ type: PompWaterRequest })
  @ApiResponse({ status: 201, type: PompWaterResponse })
  async pompWater(@Body() data: PompWaterRequest): Promise<PompWaterResponse> {
    return this.appService.pompWater(data.valveState);
  }

  @Get("logs")
  @ApiQuery({ name: "id", type: "string" })
  @ApiResponse({ status: 200, type: [GetLogsResponse] })
  @Header("Cache-Control", "none")
  async logs(@Query("id") id: string): Promise<GetLogsResponse[]> {
    const logs = await this.appService.getLogs(id);
    const sortedLogs = logs
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(logs.length - 500, logs.length)
      .map((log) => ({ timestamp: log.timestamp, value: log.value }));
    return this.appService.movingAverage(sortedLogs);
  }
}
