import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Connection, Model } from "mongoose";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name,'users') private userModel:Model<User>,@InjectConnection('users') private readonly connection:Connection){}

    async create(data:any):Promise<any> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            //Logic operations
            session.commitTransaction();
        } catch (error) {
            session.abortTransaction();
        } finally{
            session.endSession();
        }
    }
}