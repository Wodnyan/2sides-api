import express from "express";
import schedule from "node-schedule";
import cors from "cors";
import api from "./api/api";
import cnnScraper from "./scrapers/cnn";
import foxScraper from "./scrapers/fox";

const app = express();
const PORT = process.env.PORT || 5050;

const scrape = schedule.scheduleJob("0 12 * * *", () => {
    console.log("Scrapped");
    cnnScraper();
    foxScraper();
});

app.use(cors());

app.use("/api/v1", api);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
