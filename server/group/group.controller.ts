import {
  Controller, Post, Get,
  Body, Session,
  UseGuards,
  BadRequestException } from "@nestjs/common";
import { SessionParams } from "../shared/session.types";
import { AuthGuard } from "server/shared/auth.guard";
import { GroupService } from "./group.service";

export type CreateGroupParams = {
  name?: string;
}

@Controller()
@UseGuards(AuthGuard)
export class GroupController {
  public constructor(
    private readonly groupService: GroupService,
  ) {}

  @Get("/groups")
  public async getUserGroups(@Session() { userID }: SessionParams) {
    return this.groupService.getUserGroups(Number(userID));
  }

  @Post("/groups")
  public async create(@Body() { name }: CreateGroupParams, @Session() { userID }: SessionParams) {
    if (!name) {
      throw new BadRequestException("Name is required");
    }

    await this.groupService.create(name, Number(userID));
  }
}
