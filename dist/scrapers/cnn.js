"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const db_1 = require("../db/db");
const _functions_1 = require("../_functions/_functions");
async function getCnnData() {
    const CNN_DONALD_LINK = "https://edition.cnn.com/specials/politics/president-donald-trump-45";
    const html = await _functions_1.getHtml(CNN_DONALD_LINK);
    const $ = cheerio_1.default.load(html);
    const articleListContainer = ".cn-container_5470398E-4D4C-1285-E75E-4E145CCEC676";
    $(articleListContainer)
        .find("article")
        .each(async (i, el) => {
        const $article = $(el);
        const image = $article.find(".media__image");
        const imageAlt = image.attr("alt");
        const imageSrcSmall = image.data("src-small").slice(2);
        const imageSrcLarge = image.data("src-large").slice(2);
        const headline = $article.find(".cd__headline-text").text();
        const articleLink = "https://edition.cnn.com" +
            $article.find(".media > a").attr("href");
        const date = _functions_1.getDate(new Date(), "-");
        const update = {
            article_link: articleLink,
            headline,
            image_description: imageAlt,
            image_small: imageSrcSmall,
            image_large: imageSrcLarge,
        };
        db_1.CnnModel.updateOne({ date }, { $push: { articles: update } }, { upsert: true, new: true }, (err, result) => {
            if (err)
                return console.error(err);
        });
    });
}
exports.default = getCnnData;
