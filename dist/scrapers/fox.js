"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const db_1 = require("../db/db");
const _functions_1 = require("../_functions/_functions");
async function getFoxData() {
    const FOX_DONALD_LINK = "https://www.foxnews.com/category/person/donald-trump";
    const html = await _functions_1.getHtml(FOX_DONALD_LINK);
    const $ = cheerio_1.default.load(html);
    $(".main-content .article-list")
        .find(".article")
        .each((i, el) => {
        const $article = $(el);
        const ANCHOR_TAG = $article.find(".title a");
        const ANCHOR_TAG_HREF = ANCHOR_TAG.attr("href");
        if (ANCHOR_TAG_HREF) {
            const linkToArticle = ANCHOR_TAG_HREF.substr(0, 13) === "https://video"
                ? ANCHOR_TAG_HREF
                : "https://www.foxnews.com" + ANCHOR_TAG.attr("href");
            const headline = ANCHOR_TAG.text();
            const IMAGE = $article.find(".m a img");
            const imageSrc = IMAGE.attr("src");
            const imageDescription = IMAGE.attr("alt");
            const date = _functions_1.getDate(new Date(), "-");
            const update = {
                article_link: linkToArticle,
                image: imageSrc,
                image_description: imageDescription,
                headline,
            };
            db_1.FoxModel.updateOne({ date }, {
                $push: { articles: update },
            }, { upsert: true }, (err, doc) => {
                if (err)
                    return console.error(err);
            });
        }
    });
}
exports.default = getFoxData;
