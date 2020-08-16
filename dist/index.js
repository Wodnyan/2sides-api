"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api/api"));
const cnn_1 = __importDefault(require("./scrapers/cnn"));
const fox_1 = __importDefault(require("./scrapers/fox"));
const app = express_1.default();
const PORT = process.env.PORT || 5050;
const scrape = node_schedule_1.default.scheduleJob("0 12 * * *", () => {
    console.log("Scrapped");
    cnn_1.default();
    fox_1.default();
});
app.use(cors_1.default());
app.use("/api/v1", api_1.default);
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
