"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../../db/db");
const middlewares_1 = require("../../middlewares/middlewares");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    db_1.FoxModel.find({}, "date articles", (err, articles) => {
        if (err)
            return res.sendStatus(500);
        res.json({ message: "Succesfully returned articles", articles });
    });
});
router.get("/:date", middlewares_1.checkDateFormating, (req, res) => {
    const { date } = req.params;
    db_1.FoxModel.findOne({ date }, "date articles", (err, article) => {
        if (err)
            return console.error(err);
        if (!article) {
            return res
                .status(404)
                .json({ message: "Couldn't find articles on that date" });
        }
        res.json({
            message: "Succesfully returned articles",
            article,
        });
    });
});
exports.default = router;
