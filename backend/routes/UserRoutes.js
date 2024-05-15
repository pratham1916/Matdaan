const express = require('express');
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require('../model/UserModel');
const { auth } = require('../middleware/auth.middleware');
const { access } = require('../middleware/access.middleware');
require("dotenv").config()

userRouter.get("/", auth, access("admin"),async(req,res)=>{
    res.send("Hello")
})

userRouter.post("/register", async (req, res) => {
    const { fullname, email, phone, gender, dob, state, city, password } = req.body;
    try {
        const oldName = await UserModel.find({ fullname: fullname });
        const oldEmail = await UserModel.find({ email: email });

        if (fullname && oldName.length > 0) {
            return res.send({ message: "Name has already Exists", status: "error" });
        };
        if (email && oldEmail.length > 0) {
            return res.send({ message: "Email has already Exists", status: "error" });
        };

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
            return res.send({ status: "success", message: "Registration Susscessfull", user })
        })
    }
    catch (error) {
        res.status(400).json({ message: "Registration Failed" });
    }
})

userRouter.post("/login", async (req, res) => {
    const { voterId, password } = req.body
    try {
        const user = await UserModel.findOne({ voterId }).select('+password');
        if (user) {
            if (user.status === "Not Verified") {
                return res.send({ message: "You are not Verified User", status: 'error' })
            }   
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY)
                        res.status(200).json({ message: "Login Successfull", token, user})
                    } else {
                        res.status(400).json({ message: "Wrong VoterId Or Password" });
                    }
                })
            }
        }
        else {
            res.status(400).json({ message: "Voter Id not exists", status: 'error' });
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
})

module.exports = {
    userRouter
}