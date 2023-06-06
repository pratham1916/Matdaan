const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const upload = require("../utils/upload");
const router = express.Router();
require('dotenv').config();

router.post('/', async (req,res) => {
    const {isVoteStart} = req.body;
    try{
        const result = await UserModel.updateMany({status: "Verified"},{$set: { isVoteStart: isVoteStart }})
        if (upload.isUpdated(result)) {
            return res.send({status: "success", message: isVoteStart ? "Election Started" : "Election End"});
        }
        return res.send({status: "error", message: "internal server error"})
    } catch {
        return res.send({status: "error", message: "internal server error"})
    }
})

module.exports = router;