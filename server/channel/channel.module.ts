import { Module } from "@nestjs/common";
import { TelegramFetchService } from "../shared/telegram-fetch.service";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";

@Module({
  imports: [],
  controllers: [ ChannelController ],
  providers: [ ChannelService, TelegramFetchService ]
})
export class ChannelModule {}
