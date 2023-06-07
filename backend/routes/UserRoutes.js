const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const upload = require("../utils/upload");
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', async (req, res) => {
    const query = req.query;
    try{
        const filters = JSON.parse(req.get('filters') || '{}');
        const quote = {};
        const options = {};
        if (query) {
            if (query.page) options.page = Number(query.page);
            else options.page = 1;

            if (query.limit) options.limit = Number(query.limit);
        };
        if (filters) {
            const fil = filters.status;
            if (fil === "Verified" ) {
                quote.status = fil;
            } else if (fil === "Not Verified" ) {
                quote.status = fil;
            };
        };
        const user = await UserModel.paginate(quote, options);
        return res.send({status: "success", user: user.docs, count: user.totalDocs, pages: user.totalPages});
    } catch {
        return res.send({status: "error", message: "Error fetching data"})
    }
})

router.get("/:id", async (req,res) => {
    try {
        const user = await UserModel.findOne({_id: req.params.id});
        if (user) {
            return res.send({status: 'success', user: { isVoteStart: user.isVoteStart}});
        }
        
    } catch (error) {
        return res.send({status: "error", message: "Error fetching data"})
    }
})

router.post("/signup", async (req,res) => {
    const {name, email, password, dob, gender, phone, state, city} = req.body;
    try{
        const oldName = await UserModel.find({name: name});
        const oldEmail = await UserModel.find({email: email});

        if (name && oldName.length > 0 ) {
            return res.send({message: "Name has already Exists", status: "error"});
        };
        if (email && oldEmail.length > 0 ) {
            return res.send({message: "Email has already Exists", status: "error"});
        };
        const salt = await bcrypt.genSalt(10);
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.send({messaage: "Invalid Password", status: "error"})
            } 
                const vId = (Math.floor(Math.random() * 1000000000) + 1000).toString();
                const user = new UserModel({
                    name, email, password: hash, dob, gender, phone, state, city, voterId: vId , isAdmin: false, status: "Not Verified"
                });
                await user.save();
                return res.send({status: "success",messaage:"Registration Susscessfull" ,user})
        })
    } catch {
        return res.send({status: "error", message: "Signup failed"})
    }
});

router.post("/login", async (req, res) => {
    const {voterId, password} = req.body;
    try{
        const st = await UserModel.findOne({voterId}).select('+password');
        if (!st) {
            return res.send({message: "Voter Id not exists", status: 'error'});
        } else if (st.status === "Not Verified") {
            return res.send({message: "You are not Verified User", status: 'error'})
        }
        bcrypt.compare(password, st.password,(err, result) => {
            if (err) {
                return res.send({message: "Incorrect Password", status: 'error'})
            } else if (result) {
                return res.send({message: "Login Successfull", status: 'success', user: {_id: st._id, voterId: st.voterId, isAdmin: st.isAdmin, status: st.status}});
            }
        })
    } catch {
        return res.send({status: "error", message: "Login failed"})
    }
})

router.put('/:id', async (req,res) => {
    const b = req.body;
    const id = req.params.id;
    try{
        const result = await UserModel.updateOne({_id: id},{$set: b})
        if (upload.isUpdated(result)) {
            if (b.status === "Verified") {
                const from="pnemade1916@gmail.com";
                const to = b.email
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: from,
                      pass: "gjsdktzserwulslu"
                    }
                  });
                  
                  let mailOptions = {
                    from: from,
                    to: to,
                    subject: 'Election Commission Of India',
                    text: `Your voter id is ${b.voterId}, Thank you!`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }
            return res.send({status: "success"});
        }
        return res.send({status: "success", message: "no data to be changed"});
    } catch {
        return res.send({status: "error", message: "Error updating data"})
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const result = await UserModel.deleteOne({_id: req.params.id})
        if (upload.isDeleted(result)) {
            return res.send({status: "success"});
        }
        return res.send({status: 'error'})
    } catch {
        return res.send({status: "error", message: "Error deleting data"})
    }
})

module.exports = router;