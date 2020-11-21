import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { AppService } from "./app.service";
import { LogsRepository } from "./repository/logsRepository.service";
import { UARTService } from "./UARTService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogClassEntity } from "./repository/logClass.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([LogClassEntity]),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [LogsRepository, AppService, UARTService],
})
export class AppModule {}
