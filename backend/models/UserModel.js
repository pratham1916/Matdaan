
const mongoose = require("mongoose")
const paginate = require('mongoose-paginate-v2')

const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String, select: false},
    gender: {type: String},
    dob: {type: String},
    voterId: {type: String},
    phone: {type: String},
    state: {type: String},
    city: {type: String}, 
    isAdmin: {type: Boolean},
    status: {type: String},
});

UserSchema.plugin(paginate);
const UserModel=mongoose.model("user",UserSchema)

module.exports=UserModel