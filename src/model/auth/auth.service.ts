 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../User/user.model";

export const registerUser = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (payload: any) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(payload.password, user.password as string);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token };
};