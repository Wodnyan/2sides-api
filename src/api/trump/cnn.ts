import express from "express";
import { CnnModel } from "../../db/db";

const router = express.Router();

//Get All
router.get("/cnn", (req, res) => {
    CnnModel.find({}, "date news", (err, articles) => {
        if (err) return console.error(err);
        res.json({
            message: "Succesfully returned articles",
            articles,
        });
    });
});
//Get One
router.get("/cnn/:date", (req, res) => {
    const { date } = req.params;
    //TODO: Check if date is formated correctly
    CnnModel.findOne({ date }, (err, article) => {
        if (err) return console.error(err);
        res.json({
            message: "Succesfully returned article",
            article,
        });
    });
});

export default router;
