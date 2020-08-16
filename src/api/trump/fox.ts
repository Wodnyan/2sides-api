import express from "express";
import { FoxModel } from "../../db/db";
import { checkDateFormating } from "../../middlewares/middlewares";

const router = express.Router();

router.get("/", (req, res) => {
    FoxModel.find({}, "date articles", (err, articles) => {
        if (err) return res.sendStatus(500);
        res.json({ message: "Succesfully returned articles", articles });
    });
});

router.get("/:date", checkDateFormating, (req, res) => {
    const { date } = req.params;
    FoxModel.findOne({ date }, "date articles", (err, article) => {
        if (err) return console.error(err);
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

export default router;
