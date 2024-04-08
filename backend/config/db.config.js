const mongoose = require("mongoose")
require("dotenv").config;

const connection = mongoose.connect("mongodb://localhost:27017/Matdaan-New");

module.exports = {
    connection
};