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
exports.getLikeInfo = exports.toggleLike = void 0;
const like_model_1 = require("./like.model");
const toggleLike = (userId, targetId, targetType) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield like_model_1.Like.findOne({
        user: userId,
        targetId,
        targetType,
    });
    let liked = false;
    if (existing) {
        yield existing.deleteOne();
        liked = false;
    }
    else {
        yield like_model_1.Like.create({
            user: userId,
            targetId,
            targetType,
        });
        liked = true;
    }
    const totalLikes = yield like_model_1.Like.countDocuments({
        targetId,
        targetType,
    });
    return {
        liked,
        totalLikes,
        targetId,
        targetType,
    };
});
exports.toggleLike = toggleLike;
// reusable helper
const getLikeInfo = (targetId, targetType, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalLikes = yield like_model_1.Like.countDocuments({
        targetId,
        targetType,
    });
    let likedByMe = false;
    if (userId) {
        const existing = yield like_model_1.Like.findOne({
            user: userId,
            targetId,
            targetType,
        });
        likedByMe = !!existing;
    }
    return {
        totalLikes,
        likedByMe,
    };
});
exports.getLikeInfo = getLikeInfo;
