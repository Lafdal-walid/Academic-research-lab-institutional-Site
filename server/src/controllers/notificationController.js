const mongoose = require('mongoose');
const Notification = require('../models/Notification');

exports.getMyNotifications = async (req, res) => {
    try {
        const user = req.user;
        const now = new Date();
        const baseQuery = {
            $or: [
                { scheduledAt: { $exists: false } },
                { scheduledAt: null },
                { scheduledAt: { $lte: now } }
            ]
        };

        if (!['admin', 'superadmin'].includes(user.role)) {
            const userTeam = user.team ? await mongoose.model('Team').findById(user.team) : null;
            const teamName = userTeam ? userTeam.name : null;
            query = {
                $and: [
                    baseQuery,
                    {
                        $or: [
                            { team: 'All Teams' },
                            { team: teamName },
                            { specificUsers: user.email }
                        ]
                    }
                ]
            };
        } else {
            query = baseQuery;
        }

        const notifications = await Notification.find(query).populate('createdBy', 'email').sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('createdBy', 'email').sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNotification = async (req, res) => {
    try {
        if (!['admin', 'superadmin'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Only admins can send notifications' });
        }
        const { title, message, audienceType, team, specificUsers, scheduledAt } = req.body;
        const notification = await Notification.create({
            title,
            message,
            audienceType,
            team,
            specificUsers,
            createdBy: req.user._id,
            scheduledAt
        });
        await notification.populate('createdBy', 'email');
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNotification = async (req, res) => {
    try {
        if (!['admin', 'superadmin'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Only admins can update notifications' });
        }
        const { title, message, audienceType, team, specificUsers, scheduledAt } = req.body;
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { title, message, audienceType, team, specificUsers, scheduledAt, lastUsed: Date.now() },
            { new: true }
        ).populate('createdBy', 'email');
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
