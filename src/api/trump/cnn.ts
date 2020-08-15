import express from "express";
import { checkDateFormating } from "../../middlewares/middlewares";
import { CnnModel } from "../../db/db";

const router = express.Router();

//Get All
router.get("/", (req, res) => {
    CnnModel.find({}, "date articles", (err, articles) => {
        if (err) return console.error(err);
        res.json({
            message: "Succesfully returned articles",
            articles,
        });
    });
});
//Get One
router.get("/:date", checkDateFormating, (req, res) => {
    const { date } = req.params;
    CnnModel.findOne({ date }, (err, article) => {
        if (err) return console.error(err);
        if (!article) {
            return res.status(404).json({
                message: "Couldn't find articles on that date",
            });
        }
        res.json({
            message: "Succesfully returned articles",
            article,
        });
    });
});

export default router;
