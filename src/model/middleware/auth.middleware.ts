import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    console.log("decoded token:", decoded);

    req.id = decoded.id;  

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};