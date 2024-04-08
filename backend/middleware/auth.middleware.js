const jwt  = require("jsonwebtoken");
const UserModel = require("../model/UserModel");


const auth = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",async(err,decode)=>{
            if(decode){
                const{ userID } = decode;
                const user = await UserModel.findOne({_id : userID});
                const requiredRole = user.role;
                req.role = requiredRole
                req.body.userID = decode.userID
                req.body.username = decode.username
                next();
            }
            else{
                return res.status(401).json({message:"UnAuthorised"});
            }
        })
    }
    else{
        res.json({ msg: "Please Login" })
    }
}

module.exports = {
    auth
}