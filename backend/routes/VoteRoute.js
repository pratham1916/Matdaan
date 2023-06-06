const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const CandidateModel = require("../models/CandidateModel");
const VoteModel = require("../models/VoteModel");
const upload = require("../utils/upload");
const router = express.Router();
require('dotenv').config();

router.get("/", async (req,res) => {
    try {
        const vote = await VoteModel.find().sort({ _id: -1 });
        return res.send({status: 'success', vote});
    } catch (error) {
        return res.send({status: "error", message: "Error updating data"})
    }
})

router.get("/start", async (req,res) => {
    try {
        const vote = await VoteModel.find().sort({ _id: -1 }).limit(1);
        return res.send({status: 'success', vote});
    } catch (error) {
        return res.send({status: "error", message: "Error updating data"})
    }
})

router.post('/', async (req,res) => {
    const {isVoteStart} = req.body;
    try{
        const result = await UserModel.updateMany({status: "Verified"},{$set: { isVoteStart: isVoteStart }})
        if (upload.isUpdated(result)) {
            if (isVoteStart){
                const candidates = {};
                const currCandidates = await CandidateModel.find({status: "Current"})
                currCandidates.forEach((item) => {
                    candidates[`${item._id}`] = {
                      id: item._id,
                      name: item.name,
                      party: item.party,
                      position: item.position,
                      gender: item.gender,
                      vote: 0
                    };
                  });
                const vote = new VoteModel({
                    candidates, startTime: new Date(), status: "In-Progress"
                })
                await vote.save();
            } else if (!isVoteStart) {
                const vote = await VoteModel.find().sort({ _id: -1 }).limit(1);
                const voteId = vote[0]
                const highestVoteCount = Math.max(...Object.values(voteId.candidates).map(candidate => candidate.vote));
                const highestVoteCandidates = Object.values(voteId.candidates).filter(candidate => candidate.vote === highestVoteCount);
                await VoteModel.updateOne({_id: voteId._id}, {$set: { winner: highestVoteCandidates[0], endTime: new Date(), status: "Complete"}})
            }
            return res.send({status: "success", message: isVoteStart ? "Election Started" : "Election End"});
        }
        return res.send({status: "error", message: "internal server error"})
    } catch {
        return res.send({status: "error", message: "internal server error"})
    }
})

router.put("/:id", async (req,res) => {
    const b = req.body;
    const id = req.params.id;
    try {
        const result = await UserModel.find({status: "Verified"}).limit(1);
        if (!result[0].isVoteStart) {
            return res.send({status: 'error', message: "Election end"})
        } else {
            const update = {};
            update[`candidates.${b.candidateId}.vote`] = 1;
            const result = await VoteModel.updateOne({_id: id}, {$inc: update})
            return res.send({status: 'success', message: "Thanks for voting"})
        }
    } catch (error) {
        return res.send({status: "error", message: "internal server error"})
    }
})

module.exports = router;