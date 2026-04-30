const User = require('../models/User');
const Team = require('../models/Team');
const Publication = require('../models/Publication');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');

// Simple in-memory OTP store
const otpStore = new Map();
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
        expiresIn: '30d'
    });
};

exports.requestPhoneOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) return res.status(400).json({ message: 'Phone number is required' });
        
        const otp = generateOTP();
        otpStore.set(phoneNumber, otp);
        
        // Simulate SMS sending by logging to terminal
        console.log(`\n============== SMS MOCK ==============`);
        console.log(`To: ${phoneNumber}\nYour verification code is: ${otp}`);
        console.log(`======================================\n`);
        
        res.json({ message: 'Verification code sent to phone' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyPhoneOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        const storedOtp = otpStore.get(phoneNumber);
        
        if (storedOtp && storedOtp === otp) {
            otpStore.delete(phoneNumber);
            res.json({ success: true, message: 'Phone verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyEmailOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const storedOtp = otpStore.get(email);
        
        if (storedOtp && storedOtp === otp) {
            // Don't delete yet - keep it for final registration
            res.json({ success: true, message: 'Email verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid or expired email OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.requestEmailOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });
        
        const otp = generateOTP();
        otpStore.set(email, otp);
        
        // Send real email via Nodemailer
        const nodemailer = require('nodemailer');
        
        // Simplified transporter configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER.trim(),
                pass: process.env.EMAIL_PASS.trim()
            }
        });
        
        try {
            await transporter.sendMail({
                from: `"Research Lab" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Your Verification Code - Research Lab',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px; background: #0f0f13; border-radius: 16px; color: #fff;">
                        <h2 style="color:#3457DC; margin-bottom: 8px;">Verify your email</h2>
                        <p style="color:#aaa; margin-bottom: 24px;">Enter the code below to verify your email address.</p>
                        <div style="background:#1a1a24; border-radius: 12px; padding: 24px; text-align: center; letter-spacing: 12px; font-size: 36px; font-weight: bold; color: #fff; border: 1px solid #3457DC33;">
                            ${otp}
                        </div>
                        <p style="color:#666; font-size:12px; margin-top:24px; text-align:center;">This code expires in 10 minutes. Do not share it with anyone.</p>
                    </div>
                `
            });
            console.log(`[EMAIL] OTP sent to ${email}: ${otp}`);
            res.json({ success: true, message: 'Verification code sent to email' });
        } catch (emailErr) {
            console.error('[EMAIL] Failed to send real email:', emailErr.message);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send email. Please check your email configuration.' 
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerLater = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({
            username,
            email,
            password
            // phoneNumber is omitted/optional
        });

        if (user) {
            otpStore.delete(email); // consume OTP
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                degree: user.degree,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, phoneOtp } = req.body;

        // Verify phone OTP before creating user
        const storedPhoneOtp = otpStore.get(phoneNumber);
        if (!storedPhoneOtp || storedPhoneOtp !== phoneOtp) {
            return res.status(400).json({ message: 'Invalid or expired phone OTP' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({
            username,
            email,
            password,
            phoneNumber
        });

        if (user) {
            otpStore.delete(phoneNumber); // consume Phone OTP
            otpStore.delete(email); // also consume Email OTP if it exists
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                degree: user.degree,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: 'Token is required' });

        // Fetch user info from Google using the access token
        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        const googleData = await googleRes.json();

        if (!googleData.email) {
            return res.status(400).json({ message: 'Invalid Google token' });
        }

        const { email, name, sub: googleId } = googleData;

        let user = await User.findOne({ email });

        if (!user) {
            // Create user if they don't exist
            user = await User.create({
                username: name || email.split('@')[0],
                email,
                password: Math.random().toString(36).slice(-10), // Random password for social login
                phoneNumber: ''
            });
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            degree: user.degree,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    console.log(`Login attempt for: ${req.body?.email}`);
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                degree: user.degree,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('team');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.firstName = req.body.firstName !== undefined ? req.body.firstName : user.firstName;
            user.lastName = req.body.lastName !== undefined ? req.body.lastName : user.lastName;
            user.email = req.body.email || user.email;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.country = req.body.country || user.country;
            // update any other profile fields here as they are added to User schema

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: updatedUser.role,
                degree: updatedUser.degree,
                country: updatedUser.country,
                phoneNumber: updatedUser.phoneNumber,
                token: generateToken(updatedUser._id)
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Update with new password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        let query = {};
        
        // Restriction: Admin can only see users from their own team
        if (req.user.role === 'admin') {
            if (!req.user.team) {
                return res.json([]);
            }
            query = { team: req.user.team };
        }
        
        const users = await User.find(query).populate('team').select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const { role, degree } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Restriction: Admin can only manage users from their own team
        if (req.user.role === 'admin') {
            if (!req.user.team || !user.team || user.team.toString() !== req.user.team.toString()) {
                return res.status(403).json({ message: 'Access denied: You can only manage users from your own team' });
            }
        }

        if (role) user.role = role;
        if (degree) user.degree = degree;
        
        if (req.body.team !== undefined) {
            const oldTeamId = user.team;
            const newTeamId = req.body.team;

            if (oldTeamId && oldTeamId.toString() !== newTeamId) {
                // Remove from old team
                await Team.findByIdAndUpdate(oldTeamId, { $pull: { members: user._id } });
            }

            if (newTeamId) {
                // Add to new team
                await Team.findByIdAndUpdate(newTeamId, { $addToSet: { members: user._id } });
            }
            
            user.team = newTeamId || null;
        }

        const updatedUser = await user.save();
        const populatedUser = await User.findById(updatedUser._id).populate('team');
        
        res.json({
            _id: populatedUser._id,
            username: populatedUser.username,
            email: populatedUser.email,
            role: populatedUser.role,
            degree: populatedUser.degree,
            team: populatedUser.team
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getDashboardStats = async (req, res) => {
    try {
        let userQuery = {};
        let pubQuery = {};
        let projQuery = {};

        if (req.user.role === 'admin') {
            const teamId = req.user.team;
            if (teamId) {
                userQuery = { team: teamId };
                pubQuery = { team: teamId };
                projQuery = { team: teamId };
            } else {
                return res.json({ totalUsers: 0, totalPublications: 0, totalProjects: 0 });
            }
        }

        const totalUsers = await User.countDocuments(userQuery);
        const totalPublications = await Publication.countDocuments(pubQuery);
        const totalProjects = await Project.countDocuments(projQuery);
        
        res.json({
            totalUsers,
            totalPublications,
            totalProjects
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMemberSelection = async (req, res) => {
    try {
        const users = await User.find({}).select('username email team role');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
