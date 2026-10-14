

export function authorizeModification(req,res,next){
    const role = req.user.role;
    if ( role === "parent" ||  (role ==="child" && req.user.id == req.params.userId)){
        next();
    } else {
        res.status(403).json({
            "error": "Access denied" 
        });
    }
}