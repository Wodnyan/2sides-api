import express from "express";
import cnnTrumpArticles from "./trump/cnn";
const router = express.Router();

router.use("/trump", cnnTrumpArticles);

router.get("/", (req, res) => {
    res.send("Welcome to my API ;3");
});

export default router;
