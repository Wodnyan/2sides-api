"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cnn_1 = __importDefault(require("./trump/cnn"));
const fox_1 = __importDefault(require("./trump/fox"));
const router = express_1.default.Router();
router.use("/trump/cnn/", cnn_1.default);
router.use("/trump/fox/", fox_1.default);
router.get("/", (req, res) => {
    res.send("Welcome to my API ;3");
});
exports.default = router;
