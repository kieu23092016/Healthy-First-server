const express = require('express');
const {verify} = require("jsonwebtoken");

const router = express.Router();
//get posts variable -- instance of Posts in models
const {Users} = require('../models');
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken')
const{validateToken, getUserID, getDistrictManagement} = require("../middlewares/AuthMiddleware");
//register
router.post("/", async(req, res)=>{
    const {username, password, fullname, phonenumber, CCCD, role, managementArea} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username, 
            password: hash,
            fullname: fullname,
            phonenumber: phonenumber,
            CCCD: CCCD,
            role: role,
            managementArea: managementArea
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
        const accessToken = sign({username: user.username, id: user.id, provinceManagement: user.managementArea},"importantsecret");
        res.json(accessToken);
    });
})

router.post("/private",validateToken, async(req, res, )=>{
    console.log("This is user id");
    id = getUserID(req, res);
    const user = await Users.findOne({where: {id:id}});
    districtManagement = user.managementArea;
    console.log(districtManagement);
    console.log("Truy cap khi da login");
})
module.exports = router