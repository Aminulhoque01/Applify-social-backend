"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    targetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    targetType: {
        type: String,
        enum: ["post", "comment"],
        required: true,
    },
}, { timestamps: true });
// same user can't like same target twice
likeSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });
exports.Like = (0, mongoose_1.model)("Like", likeSchema);
