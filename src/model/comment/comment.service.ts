
import { Like } from "../like/like.model";
import { Post } from "../post/post.model";
import { Comment } from "./comment.model";

// Create comment or reply
export const createComment = async (
  userId: string,
  postId: string,
  payload: any
) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");
  if (!post.user) throw new Error("Invalid post");

  const postUserId = (post.user as any)?._id
    ? (post.user as any)._id.toString()
    : post.user?.toString();

  if (post.isPrivate && postUserId !== userId) {
    throw new Error("Unauthorized");
  }

  const comment = await Comment.create({
    text: payload.text,
    user: userId,
    post: postId,
    parentComment: payload.parentComment || null,  
  });

  return comment;
};

// Get comments with replies
export const getPostComments = async (
  postId: string,
  userId?: string
) => {
  const comments = await Comment.find({ post: postId })
    .populate("user", "firstName lastName profileImage")
    .sort({ createdAt: -1 });

  const enrichedComments = await Promise.all(
    comments.map(async (comment) => {
      const totalLikes = await Like.countDocuments({
        targetId: comment._id,
        targetType: "comment",
      });

      const likedByMe = !!(await Like.findOne({
        user: userId,
        targetId: comment._id,
        targetType: "comment",
      }));

      return {
        ...comment.toObject(),
        totalLikes,
        likedByMe,
      };
    })
  );

  const parentComments = enrichedComments.filter(
    (c) => !c.parentComment
  );

  const replies = enrichedComments.filter(
    (c) => c.parentComment
  );

  const formatted = parentComments.map((parent) => ({
    ...parent,
    replies: replies.filter(
      (r) =>
        r.parentComment?.toString() === parent._id.toString()
    ),
  }));

  return formatted;
};