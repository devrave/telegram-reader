import {
  Controller, Post, Get,
  Body, Session,
  UseGuards
} from "@nestjs/common";
import { MaxLength } from "class-validator";
import { SessionParams } from "../shared/session.types";
import { AuthGuard } from "server/shared/auth.guard";
import { GroupService } from "./group.service";

export class CreateGroupParams {
  @MaxLength(16)
  public name!: string;
}

@Controller()
@UseGuards(AuthGuard)
export class GroupController {
  public constructor(
    private readonly groupService: GroupService,
  ) {}

  @Get("/groups")
  public async getUserGroups(@Session() { userID }: SessionParams) {
    return this.groupService.getUserGroups(userID as number);
  }

  @Post("/groups")
  public async create(@Body() { name }: CreateGroupParams, @Session() { userID }: SessionParams) {
    await this.groupService.create(name, userID as number);
  }
}
