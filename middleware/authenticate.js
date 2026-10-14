import jwt from "jsonwebtoken";



export function authenticate (req,res,next){
    const secret = process.env.JWT_SECRET;
    const tokenhead = req.headers.authorization;
    if (!tokenhead || !tokenhead.startsWith("Bearer ")){
        res.status(401).json({
            "error": "No token provided."
        })
        return;
    }
    const token = tokenhead.split(" ")[1];
    let payload;
    try {
        payload = jwt.verify(token,secret);
    } catch (error){
        payload = null;
    }
    if (!payload){
        res.status(401).json({
            "error": "Invalid or expired token."
        })
        return;
    }
    req.user = payload;
    next();
}