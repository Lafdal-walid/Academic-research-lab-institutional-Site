const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    content: String,
    author: String,
    createdate: Date
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
