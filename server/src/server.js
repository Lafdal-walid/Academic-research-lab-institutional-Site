require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.set("view engine", "ejs");

const mongoose = require("mongoose");
const Article = require("./models/Article");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("Mongoose db connection failed:", err.message);
    });

// Start server regardless of DB connection for debugging
app.listen(port, "0.0.0.0", () => {
    console.log("App listening on port " + port);
});

app.get("/", (req, res) => {
    res.send("Hello World! Server is running.");
});

app.get("/articles", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).send("Error fetching articles: " + error.message);
    }
});