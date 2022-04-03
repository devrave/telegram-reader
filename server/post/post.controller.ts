import { Controller, Get, Param, Query } from "@nestjs/common";
import { TelegramFetchService } from "../shared/telegram-fetch.service";
import { PostService } from "../shared/post.service";

@Controller()
export class PostController {
  public constructor(
    private readonly postService: PostService,
    private readonly fetchService: TelegramFetchService
  ) {}

  @Get("/channels/:name/posts")
  public async getInfo(@Param("name") name: string, @Query("before") before: number) {
    const html = await this.fetchService.fetchChannelPage(name, before);

    return this.postService.parse(html);
  }
}
