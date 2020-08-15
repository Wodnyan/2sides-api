import express from "express";
import api from "./api/api";
import cnnScraper from "./scrapers/cnn";
import foxScraper from "./scrapers/fox";

const app = express();
const PORT = process.env.PORT || 5050;

cnnScraper();
foxScraper();

app.use("/api/v1", api);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
