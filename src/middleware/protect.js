const jwt=require("jsonwebtoken");

function adminmiddleware(req,res,next){
    const adminHeader=req.header.authorization;
    if(!adminHeader){
        return res.status(401).json({
            message: "No token"
        });
    }
    const token=adminHeader.split("")[1];
    try{
        const decoded=jwt.verify(token,"secret");
        if(decoded!=="admin"){
            res.status(403).json({
                message:"not valid crediential"
            })
        }
        req.user=decoded;
        next();

    }
    catch(err){
        return res.status(403).json({
            message:"not valid token"
        });
    }
}
module.exports=adminmiddleware