import { HttpException, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Connection, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name, "users") private userModel: Model<User>,
    @InjectConnection("users") private readonly connection: Connection,
  ) {}

  async create(data: CreateUserDto): Promise<any> {
    let savedUser: UserDocument;
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      //Logic operations
      savedUser = new this.userModel(data);
      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
      throw new HttpException(error.message,error.status);
    } finally {
      session.endSession();
      return await savedUser.save();
    }
  }

  async getUser(email:string):Promise<UserDocument> {
    const user:UserDocument = await this.userModel.findOne({email:email});
    return user;
  }
}
