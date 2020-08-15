import express from "express";
import cnnTrumpArticles from "./trump/cnn";
import foxTrumpArticles from "./trump/fox";
const router = express.Router();

router.use("/trump/cnn/", cnnTrumpArticles);
router.use("/trump/fox/", foxTrumpArticles);

router.get("/", (req, res) => {
    res.send("Welcome to my API ;3");
});

export default router;
