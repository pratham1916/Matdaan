const express = require("express");
const candidateRouter = express.Router()
const upload = require('../middleware/upload.middleware');
const CandidateModel = require("../model/CandidateModel");
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");

const uploadFields = upload.fields([{ name: "profilePic" }, { name: "signature" }]);

candidateRouter.post("/", auth, access("admin"), uploadFields, async (req, res) => {
    try {
        const { fullname, email, dob, gender, voterId, aadharId, phone, state, city, party, position } = req.body;
        const existingCandidate = await CandidateModel.findOne({ $or: [{ fullname }, { email }, { voterId }, { aadharId }] });

        if (existingCandidate) {
            return res.status(409).json({ status: "error", message: "Candidate with provided information already exists" });
        }

        const candidate = await CandidateModel.create({
            fullname, email, gender, dob, voterId, aadharId, phone, state, city, party, position,
            profilePic: req.files['profilePic'] ? req.files['profilePic'][0].filename : null,
            signature: req.files['signature'] ? req.files['signature'][0].filename : null,
            status: "Previous"
        });

        res.status(201).json({ status: "success", message: "Candidate Added Successfully", candidate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Error adding data", error });
    }
});


module.exports = {
    candidateRouter
}