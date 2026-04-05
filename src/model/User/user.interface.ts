export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage:string;
  createdAt: Date;
  updatedAt: Date;
}
