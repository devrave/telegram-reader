import { Injectable } from "@nestjs/common";
import * as HTMLParser from "node-html-parser";

export type ChannelCounters = {
  subscribers: string | null;
  photos: string | null;
  videos: string | null;
  files: string | null;
  links: string | null;
};

export type ChannelInfo = {
  title: string;
  username: string;
  description?: string;
  counters: ChannelCounters;
};

@Injectable()
export class ChannelService {
  public async parse(html: string): Promise<ChannelInfo | null> {
    const root = HTMLParser.parse(html);

    const titleElement = root.querySelector(".tgme_channel_info_header_title");
    const usernameElement = root.querySelector(
      ".tgme_channel_info_header_username"
    );
    const descriptionElement = root.querySelector(
      ".tgme_channel_info_description"
    );
    const counterElements = root.querySelectorAll(".tgme_channel_info_counter");

    if (!titleElement) {
      return null;
    }

    const title = titleElement.text;
    const username = usernameElement.text;
    const description = descriptionElement?.innerHTML;

    return {
      title,
      username,
      description,
      counters: {
        subscribers: this.extractCounterValue(counterElements, "subscribers"),
        photos: this.extractCounterValue(counterElements, "photos"),
        videos: this.extractCounterValue(counterElements, "videos"),
        files: this.extractCounterValue(counterElements, "files"),
        links: this.extractCounterValue(counterElements, "links")
      }
    };
  }

  private extractCounterValue(
    counters: HTMLParser.HTMLElement[],
    name: string
  ): string {
    for (const counter of counters) {
      const type = counter.querySelector(".counter_type").text;

      if (type === name) {
        return counter.querySelector(".counter_value").text;
      }
    }

    return null;
  }
}
