"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const getHtml = async (link) => {
    const resp = await node_fetch_1.default(link);
    const body = await resp.text();
    return body;
};
exports.default = getHtml;
