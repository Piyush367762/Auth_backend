const express = require("express");
const { login , signup }=require("./controllers/authController");
const { verifyToken } = require("./middleware/jwtMiddleware");

const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.get("/profile",verifyToken ,(req,res)=>{
    res.json({user : req.user});
});

module.exports=router;