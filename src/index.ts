import express from "express";
import api from "./api/api";
import cnnScraper from "./scrapers/cnn";

const app = express();
const PORT = process.env.PORT || 5050;

cnnScraper();

app.use("/api/v1", api);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
