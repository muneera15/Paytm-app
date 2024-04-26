const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

export const authMiddleWare = (req,res,next) =>{
    const authentication = req.headers.authentication;
    if (! authentication || !authentication.startsWith("Bearer ")){
        return res.status(403).json({
            message : "invalid user"
        })
    }

    const token = authentication.split('')[1]
    try{
        const decoded = jwt.verify({
        token
    },JWT_SECRET)
    req.userId = decoded.userId
    next();
}
catch(err){
    return res.status(403).json({
        message : "Invalid user"
    })
}
}