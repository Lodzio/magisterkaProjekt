import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Plant system")
    .setDescription("The API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  SwaggerModule.setup("api", app, document);
  await app.listen(4000);
}
bootstrap();
