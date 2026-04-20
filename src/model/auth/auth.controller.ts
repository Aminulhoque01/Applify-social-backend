import { NextFunction, Request, Response } from "express";
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

export const getUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    console.log(userId)

    const user = await AuthService.getUserByIdService(userId as string);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 

// Update user
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const payload = req.body;

    // 👇 get Cloudinary URL from multer/cloudinary
    if (req.file) {
      payload.profileImage = (req.file as any).path;
    }

    const updatedUser = await AuthService.updateUserService(
      userId as string,
      payload
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const followUser = async (req: Request, res: Response) => {
  const result = await AuthService.followUser(
    req.body.userId,
    req.params.id as string
  );
  res.json(result);
};

export const unfollowUser = async (req: Request, res: Response) => {
  const result = await AuthService.unfollowUser(
    req.body.userId,
    req.params.id as string
  );
  res.json(result);
};
