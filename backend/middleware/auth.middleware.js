const jwt  = require("jsonwebtoken");
const UserModel = require("../model/UserModel");
require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,async(err,decode)=>{
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            const user = await UserModel.findOne({ _id: decode.userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user;
            req.role = user.role;
            next();
        })
    }
    else{
        res.json({ message: "Please Login" })
    }
}

module.exports = {
    auth
}