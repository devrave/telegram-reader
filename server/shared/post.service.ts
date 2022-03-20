import { Injectable } from "@nestjs/common";
import * as HTMLParser from "node-html-parser";
import { PostContentService } from "./post-content.service";

export type PostAuthor = {
  name: string;
  photoURL: string;
};

export type PollOption = {
  value: string;
  percent: string;
};

export type PostPoll = {
  question: string;
  type: string;
  options: PollOption[];
};

export type PostFile = {
  title: string;
  extra: string;
};

export type Post = {
  id: number;
  author: PostAuthor | null;
  contentHTML: string | null;
  poll: PostPoll | null;
  videoURLs: string[];
  photoURLs: string[];
  files: PostFile[];
  stickerURLs: string[];
  views: string | null;
  date: Date | null;
  isAdvertisement: boolean;
};

@Injectable()
export class PostService {
  public parse(html: string) {
    const root = HTMLParser.parse(html);
    const posts: Post[] = [];

    const postElements = root.querySelectorAll(".tgme_widget_message");

    for (const postElement of postElements) {
      const isServicePost = postElement.classList.contains("service_message");
      if (isServicePost) {
        continue;
      }

      const post: Omit<Post, "contentHTML" | "isAdvertisement"> = {
        id: this.getPostID(postElement),
        author: this.getAuthor(postElement),
        videoURLs: this.getVideoURLs(postElement),
        photoURLs: this.getPhotoURLs(postElement),
        files: this.getFiles(postElement),
        stickerURLs: this.getStickerURLs(postElement),
        poll: this.getPoll(postElement),
        views: this.getViews(postElement),
        date: this.getDate(postElement)
      }

      const contentElement = postElement.querySelector(
        ".tgme_widget_message_text"
      );

      if (!contentElement) {
        posts.push({
          ...post,
          contentHTML: "",
          isAdvertisement: false
        });

        continue;
      }

      const contentService = new PostContentService(contentElement);
      const contentHTML = contentService.getHTML();

      posts.push({
        ...post,
        contentHTML,
        isAdvertisement: this.isAdvertisement(contentHTML)
      });
    }

    return posts;
  }

  private getAuthor(postElement: HTMLParser.HTMLElement): PostAuthor | null {
    const authorNameElement = postElement.querySelector(
      ".tgme_widget_message_owner_name"
    );
    const authorPhotoElement = postElement.querySelector(
      ".tgme_widget_message_user_photo > img"
    );

    if (!authorNameElement || !authorPhotoElement) {
      return null;
    }

    return {
      name: authorNameElement.text,
      photoURL: authorPhotoElement.attrs["src"]
    };
  }

  private getViews(postElement: HTMLParser.HTMLElement) {
    const viewsElement = postElement.querySelector(
      ".tgme_widget_message_views"
    );

    if (!viewsElement) {
      return null;
    }

    return viewsElement.text;
  }

  private getVideoURLs(postElement: HTMLParser.HTMLElement) {
    const videoElements = postElement.querySelectorAll(
      ".tgme_widget_message_video_player video"
    );

    const sources: string[] = [];

    for (const element of videoElements) {
      sources.push(element.attrs["src"]);
    }

    return [ ...new Set(sources) ];
  }

  private getPhotoURLs(postElement: HTMLParser.HTMLElement) {
    const photoElements = postElement.querySelectorAll(
      ".tgme_widget_message_photo_wrap"
    );

    const sources: string[] = [];

    for (const element of photoElements) {
      const styles = element.attrs["style"];
      const backgroundImage = styles.match(
        /background-image.*:.*url\('(.*?)'\)/
      );

      if (backgroundImage) {
        const backgroundImageURL = backgroundImage[1];

        sources.push(backgroundImageURL);
      }
    }

    return [ ...new Set(sources) ];
  }

  private getFiles(postElement: HTMLParser.HTMLElement) {
    const filesElements = postElement.querySelectorAll(
      ".tgme_widget_message_document"
    );

    const files: PostFile[] = [];

    for (const element of filesElements) {
      const titleElement = element.querySelector(
        ".tgme_widget_message_document_title"
      );
      const extraElement = element.querySelector(
        ".tgme_widget_message_document_extra"
      );

      if (!titleElement || !extraElement) {
        continue;
      }

      files.push({
        title: titleElement.text,
        extra: extraElement.text
      });
    }

    return files;
  }

  private getStickerURLs(postElement: HTMLParser.HTMLElement) {
    const stickerElements = postElement.querySelectorAll(
      ".tgme_widget_message_sticker"
    );

    const sources: string[] = [];

    for (const element of stickerElements) {
      sources.push(element.attrs["data-webp"]);
    }

    return [ ...new Set(sources) ];
  }

  private getPoll(postElement: HTMLParser.HTMLElement): PostPoll | null {
    const pollElement = postElement.querySelector(".tgme_widget_message_poll");

    if (!pollElement) {
      return null;
    }

    const questionElement = pollElement.querySelector(
      ".tgme_widget_message_poll_question"
    );
    const typeElement = pollElement.querySelector(".tgme_widget_message_poll_type");

    if (!questionElement || !typeElement) {
      return null;
    }

    const optionElements = pollElement.querySelectorAll(
      ".tgme_widget_message_poll_option"
    );

    const options: PollOption[] = [];

    for (const element of optionElements) {
      const percentElement = element.querySelector(
        ".tgme_widget_message_poll_option_percent"
      );
      const valueElement = element.querySelector(
        ".tgme_widget_message_poll_option_text"
      );

      if (!percentElement || !valueElement) {
        continue;
      }

      options.push({
        value: valueElement.text,
        percent: percentElement.text
      });
    }

    return {
      question: questionElement.text,
      type: typeElement.text,
      options
    };
  }

  private getPostID(postElement: HTMLParser.HTMLElement) {
    const postAttribute = postElement.attrs["data-post"];
    const parts = postAttribute.split("/");
    const id = Number(parts[1]);

    return id;
  }

  private getDate(postElement: HTMLParser.HTMLElement) {
    const dateElement = postElement.querySelector(
      ".tgme_widget_message_date > time"
    );

    if (!dateElement) {
      return null;
    }

    return new Date(dateElement.attrs["datetime"]);
  }

  private isAdvertisement(content: string) {
    const adwords = [ "#реклама" ];

    for (const adword of adwords) {
      if (content.includes(adword)) {
        return true;
      }
    }

    return false;
  }
}
