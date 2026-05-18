const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { generateToken } = require("../utils/token");

exports.signup = async (req,res)=>{
    console.log(req.body);
    const { name , email,  password } = req.body;
    try{
        const hashed = await bcrypt.hash(password,10);
        await pool.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3)",[name,email,hashed]);//protect from sql injection
        res.status(201).json({message : "User entered"});
        
    }
    catch (err){
        res.status(500).json({error : err.message});
    }
};
exports.signin = async(req,res)=>{
    console.log(req.body);
    const { profile_photo,phone,address}=req.body;
    try{
    await pool.query("INSERT INTO profiles(profile_photo,phone,address) VALUES($1,$2,$3)",[profile_photo,phone,address]);
    }
};
const token = generateToken({id: user.id , email : user.email});
exports.login = async(req,res)=>{
    const { email , password }= req.body;
    try{
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (result.rows.length === 0) {
             return res.status(404).json({ error: "User not found" });
        }
        const user = result.rows[0];
        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(401).json({error : " Invalid password"});
        
        res.cookie('auth_token',token,{
            httpOnly:true,
            sameSite:'Lax',
            maxAge:24*60*60*1000
        });
        return res.status(200).json({
            message:"login successfully"
        });
        
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

function profile(req, res) {
  return res.json({
    user: req.user,
  })
}
exports.logout = async(req,res)=>{
    res.clearCookie("auth_token",token,{
            httpOnly:true,
            sameSite:'Lax',
            maxAge:24*60*60*1000
    });
    return res.status(200).json({
        message:"logout successfully"
    });
}