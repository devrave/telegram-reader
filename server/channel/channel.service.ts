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
  photoURL?: string;
  descriptionHTML?: string;
  counters: ChannelCounters;
};

@Injectable()
export class ChannelService {
  public async parse(html: string): Promise<ChannelInfo | null> {
    const root = HTMLParser.parse(html);

    return {
      title: this.getTitle(root),
      username: this.getUsername(root),
      photoURL: this.getPhotoURL(root),
      descriptionHTML: this.getDescriptionHTML(root),
      counters: this.getCounters(root)
    };
  }

  private getTitle(root: HTMLParser.HTMLElement) {
    const titleElement = root.querySelector(".tgme_channel_info_header_title");

    return titleElement?.text;
  }

  private getUsername(root: HTMLParser.HTMLElement) {
    const usernameElement = root.querySelector(
      ".tgme_channel_info_header_username"
    );

    return usernameElement?.text;
  }

  private getDescriptionHTML(root: HTMLParser.HTMLElement) {
    const descriptionElement = root.querySelector(
      ".tgme_channel_info_description"
    );

    return descriptionElement?.innerHTML;
  }

  private getPhotoURL(root: HTMLParser.HTMLElement) {
    const photoElement = root.querySelector(
      ".tgme_page_photo_image > img"
    );

    return photoElement?.attrs["src"];
  }

  private getCounters(root: HTMLParser.HTMLElement) {
    const counterElements = root.querySelectorAll(".tgme_channel_info_counter");

    return {
      subscribers: this.extractCounterValue(counterElements, "subscribers"),
      photos: this.extractCounterValue(counterElements, "photos"),
      videos: this.extractCounterValue(counterElements, "videos"),
      files: this.extractCounterValue(counterElements, "files"),
      links: this.extractCounterValue(counterElements, "links")
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
