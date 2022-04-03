import { Controller, Post, Body, Session, Req, BadRequestException, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { promisify } from "util";
import { SessionParams } from "server/shared/session.types";
import { UserService } from "./user.service";

export type RegisterUserParams = {
  name?: string;
}

export type LoginParams = {
  privateKey?: string;
}

@Controller()
export class UserController {
  public constructor(
    private readonly userService: UserService
  ) {}

  @Post("/users/register")
  public async register(@Body() { name }: RegisterUserParams, @Session() session: SessionParams) {
    if (session.userID) {
      throw new BadRequestException("Already registered");
    }

    // TODO: use class-validator
    if (!name) {
      throw new BadRequestException("Name is required");
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

    if (!privateKey) {
      throw new BadRequestException("Private key is required");
    }

    const user = await this.userService.getUserByPrivateKey(privateKey);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    session.userID = user.id;
    session.name = user.name;
  }

  @Post("/users/logout")
  public async logout(@Req() request: Request) {
    const destroySession = promisify(request.session.destroy).bind(request.session);
 
    await destroySession();
  }
}
