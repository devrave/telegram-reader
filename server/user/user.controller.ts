import { Controller, Post, Body, Session, BadRequestException } from "@nestjs/common";
import { SessionParams } from "server/shared/session.types";
import { UserService } from "./user.service";

export type RegisterUserParams = {
  name?: string;
}

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post("/users")
  async register(@Body() body: RegisterUserParams, @Session() session: SessionParams) {
    const { name } = body;

    if (session.userID) {
      throw new BadRequestException("Already registered");
    }

    if (!name) {
      throw new BadRequestException("Name is required");
    }

    const user = await this.userService.register(name);

    session.userID = user.id;
    session.name = user.name;

    return {};
  }
}
