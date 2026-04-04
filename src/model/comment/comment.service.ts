import { Comment } from "./comment.model";

// Create comment or reply
export const createComment = async (
  userId: string,
  payload: any
) => {
  return await Comment.create({
    ...payload,
    user: userId,
  });
};

// Get comments with replies
export const getPostComments = async (postId: string) => {
  const comments = await Comment.find({
    post: postId,
    parentComment: null,
  })
    .populate("user", "firstName lastName")
    .sort({ createdAt: -1 });

  // attach replies
  const formatted = await Promise.all(
    comments.map(async (comment) => {
      const replies = await Comment.find({
        parentComment: comment._id,
      })
        .populate("user", "firstName lastName")
        .sort({ createdAt: 1 });

      return {
        ...comment.toObject(),
        replies,
      };
    })
  );

  return formatted;
};