import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelModule } from "./channel/channel.module";
import { Group } from "./group/group.entity";
import { GroupModule } from "./group/group.module";
import { PostModule } from "./post/post.module";
import { User } from "./user/user.entity";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ChannelModule,
    PostModule,
    UserModule,
    GroupModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres",
      port: 5432,
      username: "test",
      password: "test",
      database: "test",
      entities: [
        User,
        Group
      ],
      synchronize: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
