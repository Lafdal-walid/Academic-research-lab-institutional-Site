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
const User = require("./models/User");
const path = require('path');
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const publicationRoutes = require("./routes/publicationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const { protect } = require('./midddlewares/authMiddleware');

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/reports', reportRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/messages', require('./routes/messageRoutes'));

app.get('/api/stats/overview', protect, async (req, res) => {
    try {
        const teamId = req.user.team;

        // Get detailed project metrics
        let projectQuery = teamId ? { team: teamId } : {};
        const allProjects = await Project.find(projectQuery);
        
        // Count statuses strictly as requested for a 3-way split (Completed, Closed, In Progress)
        // Count statuses strictly as requested for a 3-way split (Completed, Closed, In Progress)
        const projectStats = {
            total: allProjects.length,
            completed: allProjects.filter(p => p.status === 'Completed').length,
            canceled: allProjects.filter(p => p.status === 'Suspended' || p.status === 'Canceled').length, // Both count as Closed
            ongoing: allProjects.filter(p => p.status === 'Ongoing' || p.status === 'Proposed').length,
            avgProgress: allProjects.length > 0 
                ? (allProjects.reduce((acc, p) => {
                    if (p.status === 'Completed') return acc + 1;
                    if (p.status === 'Suspended') return acc + 0; // Cancelled/Closed is 0% progress
                    const comp = p.milestones?.filter(m => m.completed).length || 0;
                    const tot = p.milestones?.length || 0;
                    return acc + (tot > 0 ? (comp / tot) : 0);
                  }, 0) / allProjects.length * 100).toFixed(2)
                : "0.00"
        };

        const members = await User.countDocuments(teamId ? { team: teamId } : {});
        const publications = await Publication.countDocuments(teamId ? { team: teamId } : {});
        const pubs = await Publication.find(teamId ? { team: teamId } : {});
        const views = pubs.reduce((acc, pub) => acc + (pub.views || 0), 0);
        
        const lastProjects = await Project.find(teamId ? { team: teamId } : {}).sort({ createdAt: -1 }).limit(3);
        const lastPublication = await Publication.findOne(teamId ? { team: teamId } : {}).sort({ createdAt: -1 }).populate('project');

        const period = parseInt(req.query.period) || 7;
        const monthlyStats = [];
        const now = new Date();
        for (let i = period - 1; i >= 0; i--) {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
            const count = await Publication.countDocuments({
                ...(teamId && { team: teamId }),
                createdAt: { $gte: startOfMonth, $lte: endOfMonth }
            });
            monthlyStats.push({ 
                month: startOfMonth.toLocaleString('en-US', { month: 'short' }), 
                count 
            });
        }

        const avgMonthly = (publications / period).toFixed(1);
        const avgViews = publications > 0 ? (views / publications).toFixed(1) : 0;

        // Get degree statistics for PhdTracker
        const teamUsers = await User.find(teamId ? { team: teamId } : {});
        const degreeStats = {
            mgr: teamUsers.filter(u => u.role === 'admin' || u.role === 'superadmin').length,
            phd: teamUsers.filter(u => u.degree === 'PhD' || u.degree === 'P.h.d').length,
            prof: teamUsers.filter(u => u.degree === 'Professor').length,
            eng: teamUsers.filter(u => u.degree === 'Engineering Graduate').length
        };

        let teamName = "General Lab";
        if (teamId) {
            const team = await Team.findById(teamId);
            if (team) teamName = team.name;
        }

        res.json({ 
            members, 
            publications, 
            projects: projectStats.total, 
            views, 
            lastProjects, 
            lastPublication,
            monthlyStats, 
            avgMonthly, 
            avgViews, 
            teamName, 
            projectStats,
            degreeStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

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
    console.log(`Server running at http://localhost:${port}`);
    console.log(`API check: http://localhost:${port}/api/auth/login`);
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