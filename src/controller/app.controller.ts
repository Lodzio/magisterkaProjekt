import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { AppService } from "../app.service";
import { PompWaterRequest } from "./request";
import { PompWaterResponse } from "./response";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("pompWater")
  @ApiBody({ type: PompWaterRequest })
  @ApiResponse({ type: PompWaterResponse })
  async pompWater(@Body() data: PompWaterRequest): Promise<PompWaterResponse> {
    return this.appService.pompWater(data.valveState);
  }
}
