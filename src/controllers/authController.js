const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { generateToken } = require("../utils/token");

exports.signup = async (req,res)=>{
    console.log(req.body);
    const { name , password } = req.body;//college email id
    
    try{
        const hashed = await bcrypt.hash(password,10);
        await pool.query("INSERT INTO users(name,password) VALUES($1,$2)",[name,hashed]);//protect from sql injection
        res.status(201).json({message : "User entered"});

    }
    catch (err){
        res.status(500).json({error : err.message});
    }
};

exports.login = async(req,res)=>{
    const { Username , Password}= req.body;
    try{
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if(result.rows.length==0) return res.status(401);

        const user = result.row[0];
        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(401).json({error : " Invalid password"});
        const token = generateToken({id: user.id , email : user.email});
        res.json({token});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}