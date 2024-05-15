const access = (...roles) =>{
    return (req,res,next)=>{
        if(roles.includes(req.role)){
            next();
        }
        else{
            res.status(403).send({message: 'You Dont have access'});
        }
    }
}

module.exports = {
    access
}