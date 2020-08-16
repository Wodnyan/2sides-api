"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = exports.getHtml = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.getHtml = async (link) => {
    const resp = await node_fetch_1.default(link);
    const body = await resp.text();
    return body;
};
exports.getDate = (date, separator) => {
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formatedDate = `${year}${separator}${addZeroToDate(month)}${separator}${addZeroToDate(dayOfMonth)}`;
    return formatedDate;
};
const addZeroToDate = (date) => {
    return date < 10 ? "0" + date : date;
};
