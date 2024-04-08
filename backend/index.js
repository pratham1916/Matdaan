const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.config");
const { userRouter } = require("./routes/UserRoutes");
require("dotenv").config();
const app = express();

app.use(cors())
app.use(express.json());

app.use("/",userRouter)


app.listen(process.env.PORT, async() => {
    try {
        await connection;
        console.log("DB Connected")
        console.log(`Server is Running at port ${process.env.PORT}`)
    } catch (err) {
        console.log(err)
    }
})