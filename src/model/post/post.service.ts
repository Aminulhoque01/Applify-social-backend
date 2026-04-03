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
export const getFeed = async (
  userId: string,
  query: any
) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  //  Search condition
  const searchCondition = search
    ? {
        text: { $regex: search, $options: "i" },
      }
    : {};

  
  const filter = {
    $and: [
      {
        $or: [{ isPrivate: false }, { user: userId }],
      },
      searchCondition,
    ],
  };

  const posts = await Post.find(filter)
    .populate("user")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(filter);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: posts,
  };
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