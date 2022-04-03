import { Controller, Post, Get, Body, Session, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { GroupService } from "./group.service";
import { SessionParams } from "../shared/session.types";

export type CreateGroupParams = {
  name?: string;
}

@Controller()
export class GroupController {
  public constructor(
    private readonly groupService: GroupService,
  ) {}

  // TODO: use guards
  @Get("/groups")
  public async getUserGroups(@Session() { userID }: SessionParams) {
    if (!userID) {
      throw new UnauthorizedException();
    }

    return this.groupService.getUserGroups(Number(userID));
  }

  @Post("/groups")
  public async create(@Body() { name }: CreateGroupParams, @Session() { userID }: SessionParams) {
    if (!userID) {
      throw new UnauthorizedException();
    }

    if (!name) {
      throw new BadRequestException("Name is required");
    }

    await this.groupService.create(name, Number(userID));
  }
}
