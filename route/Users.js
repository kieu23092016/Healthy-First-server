const express = require('express');
const {verify} = require("jsonwebtoken");

const router = express.Router();
//get posts variable -- instance of Posts in models
const {Users} = require('../models');
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken')
const{validateToken, getUserID, getDistrictManagement} = require("../middlewares/AuthMiddleware");
//register ------  Thêm chuyên viên
router.post("/addStaff", async(req, res)=>{
    const {username, password, fullname, phonenumber, CCCD, managementArea} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username, 
            password: hash,
            fullname: fullname,
            phonenumber: phonenumber,
            CCCD: CCCD,
            role: "staff",
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
        const accessToken = sign({username: user.username, id: user.id, provinceManagement: user.managementArea, role: user.role},"importantsecret");
        res.json(accessToken);
    });
})

//----------Sửa profile
router.post("/edit", validateToken,async (req, res)=>{
    const id = req.body.accessToken.id; 
    const newProfile = req.body.accessToken.profile; 
    const profile = await Users.findOne({where:{id:id}});
    profile.update({
        fullname: newProfile.fullname,
        phoneNumber: newProfile.phoneNumber,
        username: newProfile.email,
    });
    res.json(staff);
})

//-----------Đổi mật khẩu
router.post("/changePassword",async(req, res)=>{
    const id = req.body.accessToken.id; 

    const{password,newPassword} = req.body.password;
    const user = await Users.findOne({where:{id:id}});

    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) res.json({error:"Wrong Password"});
        else{
            bcrypt.hash(newPassword , 10).then((hash)=>{
                    Users.update({
                        password: hash,
                    });
                    res.json("SUCCESS");
            })
        }
    });
})

//---------Dùng để test
router.post("/private",validateToken, async(req, res, )=>{
    console.log("This is user id");
    id = getUserID(req, res);
    const user = await Users.findOne({where: {id:id}});
    districtManagement = user.managementArea;
    console.log(districtManagement);
    console.log("Truy cap khi da login");
})
module.exports = router