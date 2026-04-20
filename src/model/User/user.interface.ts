import { Types } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;

  followers: Types.ObjectId[];
  following: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}