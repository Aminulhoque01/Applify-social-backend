import { Post } from "./post.model";
import cloudinary from "../../config/cloudinary";

// CREATE POST
export const createPost = async (userId: string, payload: any, file?: any) => {
  let imageUrl = "";

  if (file) {
    imageUrl = file.path;  
  }

  return await Post.create({
    ...payload,
    user: userId,
    image: imageUrl,
  });
};

// GET FEED
export const getFeed = async (userId: string) => {
  return await Post.find({
    $or: [{ isPrivate: false }, { user: userId }],
  })
    .populate("user")
    .sort({ createdAt: -1 });
};

// UPDATE POST
export const updatePost = async (
  postId: string,
  userId: string,
  payload: any,
  file?: any
) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");
  if (post.user.toString() !== userId)
    throw new Error("Unauthorized");

  if (file) {
    // delete old image (optional)
    if (post.image) {
      const publicId = post.image.split("/").pop()?.split(".")[0];
      await cloudinary.uploader.destroy(`posts/${publicId}`);
    }

    payload.image = file.path;
  }

  return await Post.findByIdAndUpdate(postId, payload, {
    new: true,
  });
};

// DELETE POST
export const deletePost = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");
  if (post.user.toString() !== userId)
    throw new Error("Unauthorized");

  // delete image from cloudinary
  if (post.image) {
    const publicId = post.image.split("/").pop()?.split(".")[0];
    await cloudinary.uploader.destroy(`posts/${publicId}`);
  }

  await Post.findByIdAndDelete(postId);

  return { message: "Post deleted successfully" };
};