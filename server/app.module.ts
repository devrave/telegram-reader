import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelModule } from "./channel/channel.module";
import { PostModule } from "./post/post.module";
import { User } from "./user/user.entity";
import { UsersModule } from "./user/user.module";

@Module({
  imports: [
    ChannelModule,
    PostModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres",
      port: 5432,
      username: "test",
      password: "test",
      database: "test",
      entities: [
        User
      ],
      synchronize: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
