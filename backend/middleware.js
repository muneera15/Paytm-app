const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

export const authMiddleWare = (req,res,next) =>{
    const authentication = req.headers.authentication;
    if (! authentication || !authentication.startsWith("Bearer ")){
        return res.status(403).json({
            message : "Invalid user"
        })
    }

    const token = authentication.split('')[1]
    try{
        const decoded = jwt.verify({
        token
    },JWT_SECRET);
    if(decoded.userId){
        req.userId = decoded.userId
        next();
    }
    else{
        return res.status(403).json({
            message : "Invalid user"
        })
    }
} catch(err){
    return res.status(403).json({
        message : "Invalid user"
    })
}
}