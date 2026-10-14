import express from "express";
import {authenticate} from "../middleware/authenticate.js"
import {authorizeModification} from "../middleware/authorize.js"
import {getWatchlist, addMovie,updateMovie,deleteMovie} from "../utils/db.js"


const router = express.Router();

router.use(authenticate);

router.get("/:userId",(req,res)=>{
    const {userId} =req.params;
    const watchlist = getWatchlist(Number(userId));
    res.status(200).json(watchlist);
})

router.use(express.urlencoded({ extended: true }));

router.post("/:userId/movies",authorizeModification,(req,res)=>{
    const {userId} =req.params; 
    addMovie(Number(userId),req.body);
    res.status(201).json({
        message:"movie added"
    });
})

router.put("/:userId/movies/:movieId",authorizeModification,(req,res)=>{
    const {userId,movieId} =req.params; 
    const updatedMovie = updateMovie(Number(userId),Number(movieId),req.body);
    res.status(200).json(updatedMovie);
})

router.delete("/:userId/movies/:movieId",authorizeModification,(req,res)=>{
    const {userId,movieId} =req.params; 
    deleteMovie(Number(userId),Number(movieId));
    res.status(200).json({
        message:"movie deleted"
    });
})






export default router;