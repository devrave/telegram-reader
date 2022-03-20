import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class TelegramFetchService {
  public async fetchChannelPage(
    channel: string,
    before?: number
  ): Promise<string> {
    const url = before
      ? `https://t.me/s/${channel}?before=${before}`
      : `https://t.me/s/${channel}`;

    const response = await axios(url);

    return response.data;
  }
}
