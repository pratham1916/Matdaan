const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String,required: true},
    gender: {type: String, required: true},
    dob: {type: String, required: true},
    voterId: {type: String},
    state: {type: String, required: true},
    city: {type: String, required: true},
    password: {type: String,  required: true,select: false},
    role: {type: String, enum:["admin","user"], default:"user"},
    // isVoteStart: {type: Boolean, default: false},
    status: {type: String}
},{versionKey:false});

const UserModel = mongoose.model("user",UserSchema)

module.exports=UserModel