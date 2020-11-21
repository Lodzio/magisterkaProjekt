import { Body, Controller, Get, Post, Query } from "@nestjs/common";
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
  async logs(@Query("id") id: string): Promise<GetLogsResponse[]> {
    return this.appService.getLogs(id);
  }
}
