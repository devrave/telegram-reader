import { Controller, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post("/users")
  async create(@Query("name") name: string) {
    await this.userService.create(name);
  }
}
