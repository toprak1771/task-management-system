import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({reqired:true})
    name:string;

    @Prop({reqired:true})
    email:string;

    @Prop({reqired:true})
    password:string;
}

export const userSchema = SchemaFactory.createForClass(User);