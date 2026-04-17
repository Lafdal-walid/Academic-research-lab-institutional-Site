require("dotenv").config();
const mongoose = require("mongoose");
const Notification = require("./src/models/Notification");
const User = require("./src/models/User");
const Team = require("./src/models/Team");

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");
        
        // Find an admin or superadmin
        const admin = await User.findOne({ role: { $in: ['admin', 'superadmin'] } });
        if (!admin) {
            console.error("No admin or superadmin found in database. Please create one first.");
            process.exit(1);
        }
        console.log(`Using admin: ${admin.email}`);

        // Find some teams
        const teams = await Team.find().limit(3);
        const teamNames = teams.length > 0 ? teams.map(t => t.name) : ["Team A+", "AI Researchers", "Web Dev Group"];

        const testNotifications = [
            {
                title: "New Semester Research Grants",
                message: "Applications for the new semester research grants are now open for all PhD researchers.",
                audienceType: "teams",
                team: teamNames[0] || "All Teams",
                createdBy: admin._id
            },
            {
                title: "Lab Equipment Maintenance",
                message: "The main AI lab will be closed this Friday for scheduled equipment maintenance.",
                audienceType: "teams",
                team: teamNames[1] || "All Teams",
                createdBy: admin._id
            },
            {
                title: "Conference Submission Deadline",
                message: "A reminder that the deadline for the NeurIPS conference paper submission is approaching.",
                audienceType: "filters",
                team: teamNames[2] || "All Teams",
                createdBy: admin._id
            },
            {
                title: "Weekly Lab Meeting",
                message: "Our weekly lab meeting will be held on Monday at 10:00 AM in Room 302.",
                audienceType: "teams",
                team: "AI Saad Dahlab",
                createdBy: admin._id
            }
        ];

        await Notification.deleteMany({});
        console.log("Cleared existing notifications.");
        
        await Notification.insertMany(testNotifications);
        console.log("Seeded 4 test notifications with real admin info.");
        
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDB();
