const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.config");
const { userRouter } = require("./routes/UserRoutes");
const { candidateRouter } = require("./routes/CandidateRoute");
const { voteRouter } = require("./routes/VoteRoute");
require("dotenv").config();
const path = require('path');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/users", userRouter);
app.use("/candidates", candidateRouter);
app.use("/votes", voteRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Database connected");
        console.log("Server is running on port 8080");
    } catch (err) {
        console.error("Database connection error:", err);
    }
});
