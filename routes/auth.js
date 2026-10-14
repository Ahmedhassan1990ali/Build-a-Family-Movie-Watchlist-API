import express from "express";
import jwt from "jsonwebtoken";
import {findByUsername} from "../utils/db.js"



const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post("/login",(req,res,next)=>{
    const secret = process.env.JWT_SECRET;
    const {username,password}=req.body;
    if ( !username || !password ){
        res.status(400).json({
            message:"username and password are required"
        })
        return;
    }
    const user = findByUsername(username);
    if( !user || user._password !== password){
        res.status(401).json({
            message:"invalid credientials"
        })
        return;
    }

    const payload = {
        id : user.id,
        name : user.name,
        username :user.username,
        role: user.role
    }
    
    const token = jwt.sign(payload,secret);
    res.status(200).json({
        token: token
    })
 
})








export default router;