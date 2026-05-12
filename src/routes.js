const express = require("express");
const { login , signup , logout }=require("./controllers/authController");
const { verifyToken } = require("./middleware/jwtMiddleware");
const rateLimiter = require("./middleware/rateLimiter");

const router = express.Router();

router.post("/signup", rateLimiter, signup);

router.post("/login", rateLimiter, login);
router.get("/logout",logout);
router.post("/profile",verifyToken ,(req,res)=>{
    res.json({user : req.user});
});

module.exports=router;
