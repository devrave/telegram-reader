import {
  Controller, Post, Body,
  Session, Req,
  UseGuards,
  BadRequestException, NotFoundException
} from "@nestjs/common";
import { Request } from "express";
import { MaxLength } from "class-validator";
import { promisify } from "util";
import { AuthGuard } from "server/shared/auth.guard";
import { SessionParams } from "server/shared/session.types";
import { UserService, USER_PRIVATE_KEY_LENGTH } from "./user.service";

export class CreateUserParams {
  @MaxLength(64)
  public name!: string;
}

export class LoginParams {
  @MaxLength(USER_PRIVATE_KEY_LENGTH)
  public privateKey!: string;
}

@Controller()
export class UserController {
  public constructor(
    private readonly userService: UserService
  ) {}

  @Post("/users/register")
  public async register(@Body() { name }: CreateUserParams, @Session() session: SessionParams) {
    if (session.userID) {
      throw new BadRequestException("Already registered");
    }

    const user = await this.userService.register(name);

    session.userID = user.id;
    session.name = user.name;
  }

  @Post("/users/login")
  public async login(@Body() { privateKey }: LoginParams, @Session() session: SessionParams) {
    if (session.userID) {
      throw new BadRequestException("Already logged in");
    }

    const user = await this.userService.getUserByPrivateKey(privateKey);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    session.userID = user.id;
    session.name = user.name;
  }

  @Post("/users/logout")
  @UseGuards(AuthGuard)
  public async logout(@Req() request: Request) {
    const destroySession = promisify(request.session.destroy).bind(request.session);
 
    await destroySession();
  }
}
