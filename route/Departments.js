const express = require('express');
const router = express.Router();
const { validateToken, getUserManagementArea } = require('../middlewares/AuthMiddleware');

const {Departments} = require('../models');
const{DepartmentTesting} = require('../models');
const{Certification} = require('../models');

// router.post("/", async(req, res)=>{
//     const department = req.body; 
//     try {
//         await Departments.create(department);
//         res.json(department);
//     } catch (error) {
//         console.log(error);
//     }
// })
// ------------trả về danh sách các cơ sở + số giấy chứng nhận đạt tiêu chuẩn (chưa bị thu hồi)
router.post("/",validateToken, async (req, res)=>{
    provinceManagement = getUserManagementArea(req, res);
    // const user = await Users.findOne({where: {id:id}});
    // provinceManagement = user.managementArea;
    console.log(provinceManagement);
    const listOfDepartments = await Departments.findAll({ include:[{model: Certification, required: true, attributes:['id'], where:{disable : 0}}], where: {province: provinceManagement}});
    // const listOfDepartments = await Departments.findAll({ where: {province: provinceManagement}});

    res.json(listOfDepartments);
})

router.get("/test", async (req, res)=>{
    // const listOfDepartments = await Deparments.findAll();
    const departmenttest = await Departments.findAll({ include:[{model: DepartmentTesting, required: true}]});
    res.json(departmenttest);
})

module.exports = router;