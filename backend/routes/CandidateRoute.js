const express = require("express");
const candidateRouter = express.Router()
const upload = require('../middleware/upload.middleware');
const CandidateModel = require("../model/CandidateModel");
const { auth } = require("../middleware/auth.middleware");
const { access } = require("../middleware/access.middleware");
const {each} = require("lodash");
const path = require('path');

const uploadFields = upload.fields([{ name: "profilePic" }, { name: "signature" }]);


candidateRouter.get('/',auth, access("admin"), async (req, res) => {
    try {
        const page  = req.query.page;
    
        const filters = JSON.parse(req.get('filters') || '{}');
        const query = filters && filters.status ? { status: filters.status } : {};
        const options = { page: Number(page), limit: 10 };
        const candidates = await CandidateModel.paginate(query, options);
        return res.send({
            status: "success",
            candidates: candidates.docs,
            count: candidates.totalDocs,
            pages: candidates.totalPages
        });
    } catch {
        return res.send({status: "error",message: "Error fetching data"});
    }
});

candidateRouter.post("/", auth, access("admin"), uploadFields, async (req, res) => {
    try {
        const { fullname, email, dob, gender, voterId, adharId, phone, state, city, party, position } = req.body;
        const existingCandidate = await CandidateModel.findOne({ $or: [{ fullname }, { email }, { voterId }, { adharId }] });

        if (existingCandidate) {
            return res.status(409).json({ status: "error", message: "Candidate with provided information already exists" });
        }

        const candidate = await CandidateModel.create({
            fullname, email, gender, dob, voterId, adharId, phone, state, city, party, position,status: "Previous"
        });
        
        const toUpdate = {};
        const multiple = [];

        each(req.files, (files, fieldname) => {
            const  multerFiles = files;
            if (multiple.includes(fieldname)) {
                toUpdate[fieldname] = map(multerFiles, (file) => path.basename(file.path));
            } else {
                toUpdate[fieldname] = path.basename(multerFiles[0].path);
            }
        })
        const result = await CandidateModel.updateOne({_id: candidate._id}, {$set: toUpdate});
        return res.send({status: "success", message: "Candidate Added Succesfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Error adding data", error });
    }
});

candidateRouter.put('/:id', auth, access("admin"), async (req, res) => {
    try {
        const { status } = req.body;
        const candidate = await CandidateModel.findById(req.params.id);

        if (!candidate) {
            return res.status(404).send({ status: "error", message: "Candidate not found" });
        }

        if (candidate.status === status) {
            return res.send({ status: "error", message: "Status is already up-to-date" });
        }
        
        if (status === "Current") {
            const existingCurrent = await CandidateModel.findOne({ party: candidate.party, position: candidate.position, status: "Current" });
            if (existingCurrent && existingCurrent._id.toString() !== req.params.id) {
                return res.status(409).send({ status: 'error', message: "Person with same party and position already exists" });
            }
        }

        candidate.status = status;
        await candidate.save();
        return res.send({ status: "success", message: "Status updated successfully" });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error updating data", error });
    }
});

candidateRouter.delete('/:id', auth, access("admin"), async (req, res) => {
    try {
        const result = await CandidateModel.findByIdAndDelete(req.params.id);
        if (result) {
            return res.send({ status: "success", message: "Candidate deleted successfully" });
        } else {
            return res.status(404).send({ status: "error", message: "Candidate not found" });
        }
    } catch (error) {
        return res.status(500).send({ status: "error", message: "Error deleting data", error });
    }
});


module.exports = {
    candidateRouter
}