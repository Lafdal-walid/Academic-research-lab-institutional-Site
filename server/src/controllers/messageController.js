const Message = require('../models/Message');
const User = require('../models/User');

exports.getChatList = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Find all unique users the current user has chatted with
        const messages = await Message.find({
            $or: [{ sender: userId }, { recipient: userId }]
        }).sort({ createdAt: -1 });

        const chatMap = new Map();

        for (const msg of messages) {
            const otherUser = msg.sender.toString() === userId.toString() ? msg.recipient.toString() : msg.sender.toString();
            if (!chatMap.has(otherUser)) {
                chatMap.set(otherUser, {
                    lastMessage: msg,
                    otherUserId: otherUser
                });
            }
        }

        const chatList = await Promise.all(
            Array.from(chatMap.values()).map(async (chat) => {
                const user = await User.findById(chat.otherUserId).select('username email role');
                const unreadCount = await Message.countDocuments({
                    sender: chat.otherUserId,
                    recipient: userId,
                    read: false
                });
                return {
                    id: user._id,
                    name: user.username,
                    role: user.role,
                    lastMessage: chat.lastMessage.text || chat.lastMessage.fileName || 'File',
                    time: chat.lastMessage.createdAt,
                    unread: unreadCount > 0
                };
            })
        );

        res.json(chatList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConversation = async (req, res) => {
    try {
        const userId = req.user._id;
        const otherUserId = req.params.otherUserId;

        const messages = await Message.find({
            $or: [
                { sender: userId, recipient: otherUserId },
                { sender: otherUserId, recipient: userId }
            ]
        }).sort({ createdAt: 1 });

        // Mark messages as read
        await Message.updateMany(
            { sender: otherUserId, recipient: userId, read: false },
            { $set: { read: true } }
        );

        const formattedMessages = messages.map(msg => ({
            id: msg._id,
            sender: msg.sender.toString() === userId.toString() ? 'You' : 'Other',
            type: msg.type,
            text: msg.text || msg.fileName,
            subtext: msg.fileSize,
            fileUrl: msg.fileUrl,
            time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            self: msg.sender.toString() === userId.toString()
        }));

        res.json(formattedMessages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { recipient, text, type, fileName, fileSize } = req.body;
        let fileUrl = '';

        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
        }

        const message = await Message.create({
            sender: req.user._id,
            recipient,
            text,
            type: type || 'text',
            fileName,
            fileSize,
            fileUrl
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
