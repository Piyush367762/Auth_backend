
function allow(req,res,next){
    const url=req.header["x-admin-password"];
    if(!url){
        return res.status(401).json({
            success:false,
            message:"password required"
        });
    }
    if(url!==process.env.ADMIN_API_PASSWORD){
        return res.status(403).json({
            sucess:false,
            message:"invalid password"
        });
    }
    next();
}
module.exports=allow;