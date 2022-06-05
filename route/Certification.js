const express = require('express');
const { Op } = require("sequelize");

const router = express.Router();
//get posts variable -- instance of Posts in models
const {Certification} = require('../models');
const {Deparments} = require('../models');


// for get request: , router.post()
router.get("/", async (req, res)=>{
    // res.send("Hello");
    // res.json("HHH");
    // go through table, generate SQL select table
    //sequalize - async, await
    const listOfCert = await Certification.findAll();
    res.json(listOfCert);
})

// insert data into database -- sequelize easy for insert data into database
// how data go? 1. Form in React front end, 2. Submit form - recive data in format of json - object with 3 properties (tile, username,...), 
//3. access data in frontend - /body in the request/  - an object containing all data sending req
router.post("/", async(req, res)=>{
    const cert = req.body; 
    //for example just access the title: post.title
    // console.log(posts);
    try {
        await Certification.create(cert);
        res.json(cert);
    } catch (error) {
        console.log(error);
    }
})

router.get("/expiredDate", async(req, res)=>{
    // const id = req.params.id;
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date);
    // const cert = await Certification.findAll({where:{ expiredDate : { [Op.lt]: date } }});
    const cert = await Certification.findAll({ include:[{model: Deparments, required: true}]});
    res.json(cert);
})

router.get("/:id", async(req, res)=>{
    
    console.log("kieu");
    const id = req.params.id;

    console.log(typeof id);    
    // console.log("this is id");

    const cert = await Certification.findOne({where:{DeparmentId:id}});
    res.json(cert);
})





module.exports = router

