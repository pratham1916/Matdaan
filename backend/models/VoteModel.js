const mongoose = require("mongoose")
const paginate = require('mongoose-paginate-v2')

const VoteSchema = new mongoose.Schema({
    candidates: {},
    winner: {},
    startTime: {type: Date},
    endTime: {type: Date},
    status: {type: String},
});

VoteSchema.plugin(paginate);
const VoteModel=mongoose.model("vote",VoteSchema)

module.exports=VoteModel