import { AuthService } from "./auth.service";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable,UnauthorizedException } from "@nestjs/common";
import { UserDocument } from "src/user/schemas/user.schema";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthService) {
        super()
    }

    async validate(email:string,password:string):Promise<UserDocument> {
        const user = await this.authService.validateUser(email,password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}