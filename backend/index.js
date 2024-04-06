const express=require("express");
const path = require('path')
const cors = require("cors");
require("dotenv").config();
const UserRoute= require('./routes/UserRoutes');
const CandidateRoute= require('./routes/CandidateRoutes');
const VoteRoute = require('./routes/VoteRoute')
const connection = require('./config');
const app=express();

app.use(cors())
app.use(express.json());

app.use("/",UserRoute);

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("DB Connected")
    }
    catch(err){
        console.log(err)

    }
    console.log(`DB Connected at port ${process.env.PORT}`)
})

