import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { AppService } from "./app.service";
import { LogsRepository } from "./repository/logsRepository.service";
import { UARTService } from "./UARTService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogClassEntity } from "./repository/logClass.entity";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forFeature([LogClassEntity]),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
    }),
  ],
  controllers: [AppController],
  providers: [LogsRepository, AppService, UARTService],
})
export class AppModule {}
