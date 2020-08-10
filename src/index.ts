import express from "express";
import api from "./api/api";

const app = express();
const PORT = process.env.PORT || 5050;

app.use("/api/v1", api);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
