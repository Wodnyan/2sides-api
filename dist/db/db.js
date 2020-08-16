"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoxModel = exports.CnnModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const _functions_1 = require("../_functions/_functions");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(`mongodb+srv://wodnyan:${process.env.MONGO_PASSWORD}@my-cluster-jv3bc.mongodb.net/2sides?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, (err) => {
    if (err)
        return console.error(err);
    console.log("Connected to database");
});
const { Schema } = mongoose_1.default;
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
    date: { type: Date, default: _functions_1.getDate(new Date(), "-") },
    articles: [FoxArticleSchema],
});
const CnnSchema = new Schema({
    date: { type: Date, default: _functions_1.getDate(new Date(), "-") },
    articles: [CnnArticleSchema],
});
exports.CnnModel = mongoose_1.model("cnn_article", CnnSchema);
exports.FoxModel = mongoose_1.model("fox_article", FoxSchema);
