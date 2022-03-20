import { Controller, Get, Param } from "@nestjs/common";
import { TelegramFetchService } from "../shared/telegram-fetch.service";
import { ChannelService } from "./channel.service";

@Controller({
  path: "channels"
})
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly fetchService: TelegramFetchService
  ) {}

  @Get(":name")
  async get(@Param("name") name: string) {
    const html = await this.fetchService.fetchChannelPage(name);

    return this.channelService.parse(html);
  }
}
