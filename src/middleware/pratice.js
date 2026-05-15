//just test some new middleware
function apiKeyMiddleWare(req,res,next){
    const apikey=req.header["x-api-key"];
    if(!apikey || apiKey!==process.env.INTERNAL_API_KEY){
        return res.status(401).json({
            success:false,
            message:"Invalid API key"
        });
    }
    next();
}

module.exports=apiKeyMiddleWare;