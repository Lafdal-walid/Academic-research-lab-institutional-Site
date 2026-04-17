require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.set("view engine", "ejs");

const mongoose = require("mongoose");
const cors = require('cors');
const Article = require("./models/Article");
const Team = require("./models/Team");
const Publication = require("./models/Publication");
const News = require("./models/News");
const Project = require("./models/Project");
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const publicationRoutes = require("./routes/publicationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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