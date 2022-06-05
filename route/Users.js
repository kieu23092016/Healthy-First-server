const express = require('express');

const router = express.Router();
//get posts variable -- instance of Posts in models
const {Users} = require('../models');
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken')
const{validateToken} = require("../middlewares/AuthMiddleware");
//register
router.post("/", async(req, res)=>{
    const {username, password, fullname, phonenumber, CCCD} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username, 
            password: hash,
            fullname: fullname,
            phonenumber: phonenumber,
            CCCD: CCCD,
        });
        res.json("SUCCESS");
    })
})
//login
router.post("/login", async(req, res)=>{
    const{username, password} = req.body;

    const user = await Users.findOne({where: {username:username}});

    if(!user) res.json({error:"User doesn't exits"});
    console.log(password);
    // console.log(user.password);
    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) res.json({error:"Wrong Username And Password Combination"});
        //write comment: access what user using
        //jj
        // id: make request - have identify all time
        const accessToken = sign({username: user.username, id: user.id},"importantsecret");
        res.json(accessToken);
    });
})

router.post("/private",validateToken, async(req, res)=>{
    console.log("Truy cap khi da login");
})
module.exports = router