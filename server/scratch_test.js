require("dotenv").config();
const mongoose = require("mongoose");
const News = require("./src/models/News");
const Team = require("./src/models/Team");

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected");
        const count = await News.countDocuments();
        console.log("News count:", count);
        const teams = await Team.find().limit(1);
        console.log("Team found:", teams.length > 0 ? teams[0].name : "None");
        process.exit(0);
    } catch (err) {
        console.error("Test failed:", err);
        process.exit(1);
    }
}

test();
