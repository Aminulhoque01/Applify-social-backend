import { Types } from "mongoose";

export interface IPost extends Document {
  user: Types.ObjectId;
  text?: string;
  image?: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}