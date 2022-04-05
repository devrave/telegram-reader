import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as session from "express-session";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // TODO: use session secret from config or env file
  app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  }));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}

bootstrap();
