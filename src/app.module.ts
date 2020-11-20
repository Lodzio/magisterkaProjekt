import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { AppService } from "./app.service";
import { Repository } from "./repository/repository";
import { SQLiteRepository } from "./repository/SQLiteRepository";
import { UARTService } from "./UARTService";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    UARTService,
    { provide: Repository, useClass: SQLiteRepository },
  ],
})
export class AppModule {}
