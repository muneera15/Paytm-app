const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleWare = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")){
        return res.status(403).json({
            message : "Invalid user"
        })
    }

    const token = authorization.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
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
module.exports = {
    authMiddleWare
};