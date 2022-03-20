import * as HTMLParser from "node-html-parser";

export class PostContentService {
  public constructor(private readonly contentElement: HTMLParser.HTMLElement) {}

  public getHTML(): string {
    this.hideDuplicateEmojis();

    return this.contentElement.innerHTML;
  }

  private hideDuplicateEmojis() {
    const emojis = this.contentElement.querySelectorAll(".emoji");

    for (const emoji of emojis) {
      emoji.setAttribute("style", "");
    }
  }
}
