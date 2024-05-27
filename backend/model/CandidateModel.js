const mongoose = require("mongoose")
const paginate = require('mongoose-paginate-v2')

const CandidateSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    voterId: { type: String, required: true },
    adharId: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    party: { type: String, required: true },
    position: { type: String, required: true },
    profilePic: { type: String},
    signature: { type: String},
    status: { type: String},
},{ versionKey: false });

CandidateSchema.plugin(paginate);
const CandidateModel = mongoose.model("candidate", CandidateSchema)

module.exports = CandidateModel;