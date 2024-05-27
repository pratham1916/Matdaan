const express = require('express');
const VoteModel = require('../model/VoteModel');
const CandidateModel = require('../model/CandidateModel');
const UserModel = require('../model/UserModel');
const voteRouter = express.Router();

voteRouter.get("/", async (req, res) => {
    try {
        const result = await VoteModel.find().sort({ _id: -1 });
        return res.send({ status: 'success', result });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Failed to retrieve votes" });
    }
});

voteRouter.get("/latest", async (req, res) => {
    try {
        const latestVote = await VoteModel.findOne().sort({ _id: -1 }).limit(1);
        return res.send({ status: 'success', latestVote });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Failed to retrieve latest vote" });
    }
});

voteRouter.post("/", async (req, res) => {
    const { isVoteStart } = req.body;
    
    try {
        await UserModel.updateMany({ status: "Verified" }, { $set: { isVoteStart } });

        if (isVoteStart) {
            const currentCandidates = await CandidateModel.find({ status: "Current" });
            const candidates = currentCandidates.reduce((acc, candidate) => {
                acc[candidate._id] = {
                    id: candidate._id,
                    fullname: candidate.fullname,
                    party: candidate.party,
                    position: candidate.position,
                    vote: 0
                };
                return acc;
            }, {});
            
            const newVote = new VoteModel({
                candidates,
                startTime: new Date(),
                status: "In-Progress"
            });
            await newVote.save();
            return res.json({ status: "success", message: "Election started" });
        } else {
            const latestVote = await VoteModel.findOne().sort({ _id: -1 });

            if (latestVote) {
                const maxVotes = Math.max(...Object.values(latestVote.candidates).map(candidate => candidate.vote));
                const winners = Object.values(latestVote.candidates).filter(candidate => candidate.vote === maxVotes);

                await VoteModel.updateOne(
                    { _id: latestVote._id },
                    { $set: { winner: winners[0], endTime: new Date(), status: "Complete" } }
                );
            }
            return res.json({ status: "success", message: "Election ended" });
        }
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Failed to update voting status", error: error.message });
    }
});

voteRouter.put("/:id", async (req, res) => {
    const {candidateId} = req.body;
    const voteId = req.params.id;

    console.log(voteId);
    console.log(candidateId);
    try {
        const user = await UserModel.findOne({ status: "Verified" });
        console.log(user);
        if (!user || !user.isVoteStart) {
            return res.send({ status: 'error', message: "Election has ended" });
        } else {
            const updateQuery = {};
            
            updateQuery[`candidates.${candidateId}.vote`] = 1;
            console.log(updateQuery);
            const result = await VoteModel.updateOne({ _id: voteId }, { $inc: updateQuery });
            console.log(result);
            return res.send({ status: 'success', message: "Thanks for voting" });
        }
    } catch (error) {
        return res.send({ status: "error", message: "Internal server error" });
    }
});


module.exports = {
    voteRouter
};
