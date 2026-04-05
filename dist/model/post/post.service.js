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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getSingle = exports.getFeed = exports.createPost = void 0;
const post_model_1 = require("./post.model");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
// CREATE POST
const createPost = (userId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = "";
    if (file) {
        imageUrl = file.path;
    }
    return yield post_model_1.Post.create(Object.assign(Object.assign({}, payload), { user: userId, image: imageUrl }));
});
exports.createPost = createPost;
// GET FEED
const getFeed = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
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
    const posts = yield post_model_1.Post.find(filter)
        .populate("user")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = yield post_model_1.Post.countDocuments(filter);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: posts,
    };
});
exports.getFeed = getFeed;
const getSingle = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const post = yield post_model_1.Post.findById(id).populate("user");
    if (!post) {
        throw new Error("Post not found");
    }
    // Privacy check
    if (post.isPrivate && ((_a = post.user) === null || _a === void 0 ? void 0 : _a.toString()) !== userId) {
        throw new Error("Unauthorized");
    }
    return post;
});
exports.getSingle = getSingle;
// UPDATE POST
const updatePost = (postId, userId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const post = yield post_model_1.Post.findById(postId);
    if (!post)
        throw new Error("Post not found");
    if (post.user.toString() !== userId)
        throw new Error("Unauthorized");
    if (file) {
        // delete old image (optional)
        if (post.image) {
            const publicId = (_a = post.image.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
            yield cloudinary_1.default.uploader.destroy(`posts/${publicId}`);
        }
        payload.image = file.path;
    }
    return yield post_model_1.Post.findByIdAndUpdate(postId, payload, {
        new: true,
    });
});
exports.updatePost = updatePost;
// DELETE POST
const deletePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const post = yield post_model_1.Post.findById(postId);
    if (!post)
        throw new Error("Post not found");
    if (post.user.toString() !== userId)
        throw new Error("Unauthorized");
    // delete image from cloudinary
    if (post.image) {
        const publicId = (_a = post.image.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
        yield cloudinary_1.default.uploader.destroy(`posts/${publicId}`);
    }
    yield post_model_1.Post.findByIdAndDelete(postId);
    return { message: "Post deleted successfully" };
});
exports.deletePost = deletePost;
