import { Request, Response } from "express";
import * as AuthService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  res.json({
    success: true,
    data: result,
  });
};

export const login = async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  res.json({
    success: true,
    data: result,
  });
};