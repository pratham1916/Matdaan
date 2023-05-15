const express = require("express");
const path = require('path')

const upload = require('../utils/upload')
const CandidateModel = require("../models/CandidateModel");
const multer = require("multer");
const router = express.Router();
const {isArray, each} = require('lodash')
require('dotenv').config()

const storage = upload.diskStorage('candidates')

const fileFilter = (req, file, cb) => {
    if (!req.fileError) req.fileError = {};
    if (file.fieldname === 'profilePic') {
        if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
            cb(null, true)
        } else {
            req.fileError.profilePic = 'Unsupported file format'
            cb(null, false)
        }
    } 
    if (file.fieldname === 'signature') {
        if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
            cb(null, true)
        } else {
            req.fileError.signature = 'Unsupported file format'
            cb(null, false)
        }
    }
}

const fileFields = [{name: "profilePic"}, {name: "signature"}];

router.get('/', async (req,res) => {
    const query = req.query;
    try {
        const options = {};
        const quote = {};
        if (query) {
            if (query.page) options.page = Number(query.page);
            else options.page = 1;

            if (query.limit) options.limit = Number(query.limit);
        };
        const candidate = await CandidateModel.paginate(quote, options);
        return res.send({status: "success", candidate: candidate.docs, count: candidate.totalDocs, pages: candidate.totalPages});
    } catch {
        return res.send({status: "error", message: "Error fetching data"})
    }
})

router.post("/add", multer({storage, fileFilter}).fields(fileFields), async (req,res) => {
    const {name, email, dob, gender, voterId, aadhar, phone, state, city, party, position } = req.body;
    try{
        const oldName = await CandidateModel.find({name: name});
        const oldEmail = await CandidateModel.find({email: email});
        const oldVoter = await CandidateModel.find({voterId: voterId});
        const oldAadhar = await CandidateModel.find({aadhar: aadhar});

        if (name && oldName.length > 0 ) {
            return res.send({message: "Name has already Exists", status: "error"});
        };
        if (email && oldEmail.length > 0 ) {
            return res.send({message: "Email has already Exists", status: "error"});
        };
        if (voterId && oldVoter.length > 0 ) {
            return res.send({message: "Voter Id has already Exists", status: "error"});
        };
        if (aadhar && oldAadhar.length > 0 ) {
            return res.send({message: "Aadhar Id has already Exists", status: "error"});
        };
    
        const candidate = new CandidateModel({
            name, email, dob, gender, phone, state, city, voterId, aadhar, party, position
        });
        await candidate.save();
        const toUpdate = {};
        const toCleanUp = [];
        const multiple = [];
        each(req.files, (files, fieldname) => {
            const  multerFiles = files;
            if (multiple.includes(fieldname)) {
                toUpdate[fieldname] = map(multerFiles, (file) => `candidates/${path.basename(file.path)}`);
                const currentValue = candidate[fieldname];
                if (isArray(currentValue)) {
                    currentValue.forEach((value) => toCleanUp.push(value))
                }
            } else {
                toUpdate[fieldname] = `candidates/${path.basename(multerFiles[0].path)}`;
                const currentValue = candidate[fieldname];
                if (currentValue) {
                    toCleanUp.push(currentValue);
                }  
            }
        })
        const result = await CandidateModel.updateOne({_id: candidate._id}, {$set: toUpdate});
        if (upload.isUpdated(result)) {
            if (toCleanUp.length > 0) {
                upload.cleanUp(toCleanUp);
            }
            return res.send({status: "success", candidate: candidate, images: toUpdate, reject: req.fileError})
        }
    } catch {
        return res.send({status: "error", message: "Error adding data"})
    }    
});

router.put('/:id', async (req,res) => {
    try{
        const result = await CandidateModel.updateOne({_id: req.params.id},{$set: req.body})
        if (upload.isUpdated(result)) {
            return res.send({status: "success"});
        }
        return res.send({status: "success", message: "no data to be changed"});
    } catch {
        return res.send({status: "error", message: "Error updating data"})
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const result = await CandidateModel.deleteOne({_id: req.params.id})
        if (upload.isDeleted(result)) {
            return res.send({status: "success"});
        }
        return res.send({status: 'error'})
    } catch {
        return res.send({status: "error", message: "Error deleting data"})
    }
})

module.exports = router;