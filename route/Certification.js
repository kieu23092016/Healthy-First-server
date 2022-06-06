const express = require('express');
const { Op } = require("sequelize");
const { validateToken,getUserManagementArea } = require('../middlewares/AuthMiddleware');

const router = express.Router();
//get posts variable -- instance of Posts in models
const {Certification} = require('../models');
const {Departments} = require('../models');
const {Users} = require('../models');


// -----danh sách giấy chứng nhận
router.post("/", validateToken,async (req, res)=>{
    provinceManagement = getUserManagementArea(req, res);
    console.log(provinceManagement);
    const listOfCert = await Certification.findAll({include:[{model: Departments, required: true, attributes:['id','name'], where:{province : provinceManagement}}]});
    res.json(listOfCert);
})

// insert data into database -- sequelize easy for insert data into database
// how data go? 1. Form in React front end, 2. Submit form - recive data in format of json - object with 3 properties (tile, username,...), 
//3. access data in frontend - /body in the request/  - an object containing all data sending req

// ------Cấp mới giấy chứng nhận
router.post("/create", validateToken, async(req, res)=>{
    const cert = req.body.cert; 
    //for example just access the title: post.title
    // console.log(posts);
    try {
        await Certification.create(cert);
        res.json(cert);
    } catch (error) {
        console.log(error);
    }
})
//--------Thu hồi giấy chứng nhận
router.post("/recall/:id", validateToken,async(req, res)=>{    
    const id = req.params.id;
    const cert = await Certification.findOne({where:{id:id}});
    cert.update({disable: 1});
    res.json(cert);
})

//-----Gia hạn giấy chứng nhận
router.post("/extend/:id",validateToken, async(req, res)=>{
    const id = req.params.id;
    const today = new Date();
    const initialDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const expiredDate = today.getFullYear()+3+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const newCert = await Certification.findOne({where:{id:id}});
    newCert.update({initialDate: initialDate, expiredDate: expiredDate});
    res.json(newCert);
})


router.get("/expiredDate", async(req, res)=>{
    // const id = req.params.id;
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(date);
    // const cert = await Certification.findAll({where:{ expiredDate : { [Op.lt]: date } }});
    const cert = await Certification.findAll({ include:[{model: Departments, required: true}], where:{ expiredDate : { [Op.lte]: date } }});
    res.json(cert);
})


module.exports = router

