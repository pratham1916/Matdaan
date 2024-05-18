const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.config");
const { userRouter } = require("./routes/UserRoutes");
const { candidateRouter } = require("./routes/CandidateRoute");
require("dotenv").config();
const app = express();
const path = require('path');

app.use(cors())
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use("/", userRouter)
app.use("/candidate",candidateRouter)


app.listen(8080, async() => {
    try {
        await connection;
        console.log("DB Connected")
        console.log(`Server is Running at port 8080`)
    } catch (err) {
        console.log(err)
    }
})