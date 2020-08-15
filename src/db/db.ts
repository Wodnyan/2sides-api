import mongoose, { model } from "mongoose";
import { getDate } from "../_functions/_functions";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
    `mongodb+srv://wodnyan:${process.env.MONGO_PASSWORD}@my-cluster-jv3bc.mongodb.net/2sides?retryWrites=true&w=majority`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err) => {
        if (err) return console.error(err);
        console.log("Connected to database");
    }
);

const { Schema } = mongoose;

const FoxArticleSchema = new Schema({
    headline: String,
    article_link: String,
    image: String,
    image_description: String,
});

const CnnArticleSchema = new Schema({
    headeline: String,
    article_link: String,
    image_large: String,
    image_small: String,
    image_description: String,
});

const FoxSchema = new Schema({
    date: { type: Date, default: getDate(new Date(), "-") },
    articles: [FoxArticleSchema],
});

const CnnSchema = new Schema({
    date: { type: Date, default: getDate(new Date(), "-") },
    articles: [CnnArticleSchema],
});

export const CnnModel = model("cnn_article", CnnSchema);
export const FoxModel = model("fox_article", FoxSchema);
