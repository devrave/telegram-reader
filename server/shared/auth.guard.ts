import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { SessionParams } from "./session.types";

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateSession(request.session);
  }

  private validateSession(session: SessionParams) {
    return session.userID != null;
  }
}
