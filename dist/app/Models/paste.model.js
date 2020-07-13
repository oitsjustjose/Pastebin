"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var shortid_1 = __importDefault(require("shortid"));
var Paste = new mongoose_1.Schema({
    _id: {
        type: String,
        default: shortid_1.default.generate
    },
    paste: { type: String },
    syntax: {
        type: String,
        default: "text"
    },
    expiresAt: {
        type: Date,
        expires: 0,
        default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Paste', Paste);
