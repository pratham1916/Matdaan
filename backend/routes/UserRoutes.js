const express = require('express');
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require('../model/UserModel');
const nodemailer = require('nodemailer');
const { auth } = require('../middleware/auth.middleware');
const { access } = require('../middleware/access.middleware');
require("dotenv").config();

userRouter.get("/", auth, access("admin"), async (req, res) => {
    res.send("Hello, Admin");
});

userRouter.post("/register", async (req, res) => {
    const { fullname, email, phone, gender, dob, state, city, password } = req.body;
    try {
        const existingUserByName = await UserModel.findOne({ fullname });
        const existingUserByEmail = await UserModel.findOne({ email });

        if (existingUserByName) {
            return res.status(400).json({ message: "Name already exists", status: "error" });
        }
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already exists", status: "error" });
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Password", err });
            }
            const firstNamePart = fullname.split(' ')[0];
            const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
            const vId = `${firstNamePart}${randomNumber}`;
            const user = new UserModel({
                fullname, email, phone, gender, dob, voterId: vId, state, city, password: hash
            });
            await user.save();
            return res.status(201).json({ status: "success", message: "Registration Successful" });
        });
    } catch (error) {
        res.status(400).json({ message: "Registration Failed", status: "error" });
    }
});

userRouter.post("/login", async (req, res) => {
    const { voterId, password } = req.body;
    try {
        const user = await UserModel.findOne({ voterId }).select('+password');
        if (user) {
            if (user.status === "Not Verified") {
                return res.status(400).json({ message: "You are not a verified user", status: 'error' });
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
                        res.status(200).json({ message: "Login Successful", token, user });
                    } else {
                        res.status(400).json({ message: "Wrong Voter ID or Password", status: "error" });
                    }
                });
            }
        } else {
            res.status(400).json({ message: "Voter ID does not exist", status: 'error' });
        }
    } catch (error) {
        res.status(400).json({ message: "Login Failed", status: "error" });
    }
});

userRouter.get("/voters/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            res.status(200).json({ status: 'success', isVoteStart: user.isVoteStart });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error fetching data' });
    }
});

userRouter.get('/voters', auth, access("admin"), async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const filters = JSON.parse(req.get('filters') || '{}');
        const query = filters.status ? { status: filters.status } : {};
        const options = { page, limit };
        const voters = await UserModel.paginate(query, options);
        res.status(200).json({
            status: "success",
            voters: voters.docs,
            count: voters.totalDocs,
            pages: voters.totalPages
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error fetching data" });
    }
});


userRouter.put('/voters/:id', async (req, res) => {
    const updateData = req.body;
    try {
        const result = await UserModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (updateData.status === "Verified") {
            const from = process.env.EMAIL_USER;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: from,
                    pass: "mltcxfjpbyxyemgs"
                }
            });

            const mailOptions = {
                from,
                to: updateData.email,
                subject: 'Election Commission Of India',
                text: `Your voter ID is ${updateData.voterId}. Thank you!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }
        res.status(200).json({ status: "success", message: "User updated successfully", user: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error updating data" });
    }
});

userRouter.delete('/voters/:id', auth, access("admin"), async (req, res) => {
    try {
        const result = await UserModel.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ status: "success", message: "User deleted successfully" });
        } else {
            res.status(404).json({ status: "error", message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error deleting data", error });
    }
});

module.exports = {
    userRouter
};
