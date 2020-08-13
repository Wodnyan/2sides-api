import cheerio from "cheerio";
import { CnnModel } from "../db/db";
import { getHtml, getDate } from "../_functions/_functions";

export default async function getCnnData() {
    const CNN_DONALD_LINK =
        "https://edition.cnn.com/specials/politics/president-donald-trump-45";
    const html = await getHtml(CNN_DONALD_LINK);
    const $ = cheerio.load(html);
    const articleListContainer =
        ".cn-container_5470398E-4D4C-1285-E75E-4E145CCEC676";
    $(articleListContainer)
        .find("article")
        .each(async (i, el) => {
            const $article = $(el);
            const image = $article.find(".media__image");
            const imageAlt = image.attr("alt");
            const imageSrcSmall = image.data("src-small").slice(2);
            const imageSrcLarge = image.data("src-large").slice(2);
            const headline = $article.find(".cd__headline-text").text();
            const articleLink =
                "https://edition.cnn.com" +
                $article.find(".media > a").attr("href");

            const date = getDate(new Date(), "-");

            const articleObj = {
                article_link: articleLink,
                headline,
                image_description: imageAlt,
                image_small: imageSrcSmall,
                image_large: imageSrcLarge,
            };
            // CnnModel.updateOne(
            //     { date },
            //     { $push: { news: articleObj } },
            //     { upsert: true, new: true },
            //     (err, result) => {
            //         if (err) return console.error(err);
            //     }
            // );
        });
}
