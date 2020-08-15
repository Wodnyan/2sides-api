import cheerio from "cheerio";
import { FoxModel } from "../db/db";
import { getHtml, getDate } from "../_functions/_functions";

export default async function getFoxData() {
    const FOX_DONALD_LINK =
        "https://www.foxnews.com/category/person/donald-trump";
    const html = await getHtml(FOX_DONALD_LINK);
    const $ = cheerio.load(html);
    $(".main-content .article-list")
        .find(".article")
        .each((i, el) => {
            const $article = $(el);
            const ANCHOR_TAG = $article.find(".title a");
            const ANCHOR_TAG_HREF = ANCHOR_TAG.attr("href");
            //Otherwise returns a blank article.
            if (ANCHOR_TAG_HREF) {
                const linkToArticle =
                    ANCHOR_TAG_HREF.substr(0, 13) === "https://video"
                        ? ANCHOR_TAG_HREF
                        : "https://www.foxnews.com" + ANCHOR_TAG.attr("href");
                const headline = ANCHOR_TAG.text();
                const IMAGE = $article.find(".m a img");
                const imageSrc = IMAGE.attr("src");
                const imageDescription = IMAGE.attr("alt");

                const date = getDate(new Date(), "-");

                const update = {
                    article_link: linkToArticle,
                    image: imageSrc,
                    image_description: imageDescription,
                    headline,
                };
                FoxModel.updateOne(
                    { date },
                    {
                        $push: { articles: update },
                    },
                    { upsert: true },
                    (err, doc) => {
                        if (err) return console.error(err);
                    }
                );
            }
        });
}
