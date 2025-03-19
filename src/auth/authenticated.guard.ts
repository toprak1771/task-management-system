import { CanActivate,ExecutionContext,Injectable } from "@nestjs/common";
import { Observable, retry } from "rxjs";

@Injectable()
export class AuthenticateGuard implements CanActivate{
    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        return request.isAuthenticated();
    }
}