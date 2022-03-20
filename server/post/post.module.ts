import { Module } from "@nestjs/common";
import { TelegramFetchService } from "../shared/telegram-fetch.service";
import { PostService } from "../shared/post.service";
import { PostController } from "./post.controller";

@Module({
  imports: [],
  controllers: [ PostController ],
  providers: [ PostService, TelegramFetchService ]
})
export class PostModule {}
