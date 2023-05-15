const mongoose = require("mongoose")
const paginate = require('mongoose-paginate-v2')

const CandidateSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    gender: {type: String},
    dob: {type: String},
    voterId: {type: String},
    aadhar: {type: String},
    phone: {type: String},
    state: {type: String},
    city: {type: String},
    party: {type: String},
    position: {type: String},
    profilePic: {type: String},
    signature: {type: String},   
});

CandidateSchema.plugin(paginate);
const CandidateModel=mongoose.model("candidate",CandidateSchema)

module.exports=CandidateModel;