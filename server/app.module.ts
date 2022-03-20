import { Module } from "@nestjs/common";
import { ChannelModule } from "./channel/channel.module";
import { PostModule } from "./post/post.module";

@Module({
  imports: [ ChannelModule, PostModule ],
  controllers: [],
  providers: []
})
export class AppModule {}
