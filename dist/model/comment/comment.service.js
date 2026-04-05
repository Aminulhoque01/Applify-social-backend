"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostComments = exports.createComment = void 0;
const post_model_1 = require("../post/post.model");
const comment_model_1 = require("./comment.model");
// Create comment or reply
const createComment = (userId, postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const post = yield post_model_1.Post.findById(postId);
    if (!post)
        throw new Error("Post not found");
    if (!post.user)
        throw new Error("Invalid post");
    const postUserId = ((_a = post.user) === null || _a === void 0 ? void 0 : _a._id)
        ? post.user._id.toString()
        : (_b = post.user) === null || _b === void 0 ? void 0 : _b.toString();
    if (post.isPrivate && postUserId !== userId) {
        throw new Error("Unauthorized");
    }
    const comment = yield comment_model_1.Comment.create({
        text: payload.text,
        user: userId,
        post: postId,
        parentComment: payload.parentComment || null,
    });
    return comment;
});
exports.createComment = createComment;
// Get comments with replies
const getPostComments = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield comment_model_1.Comment.find({ post: postId })
        .populate("user", "firstName lastName")
        .sort({ createdAt: -1 });
    // separate parent + replies
    const parentComments = comments.filter(c => !c.parentComment);
    const replies = comments.filter(c => c.parentComment);
    const formatted = parentComments.map(parent => (Object.assign(Object.assign({}, parent.toObject()), { replies: replies.filter(r => { var _a; return ((_a = r.parentComment) === null || _a === void 0 ? void 0 : _a.toString()) === parent._id.toString(); }) })));
    return formatted;
});
exports.getPostComments = getPostComments;
