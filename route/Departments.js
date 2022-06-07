const express = require('express');
const router = express.Router();
const { validateToken, getUserManagementArea } = require('../middlewares/AuthMiddleware');

const {Departments} = require('../models');
const{DepartmentTesting} = require('../models');
const{Certification} = require('../models');


// ------------trả về danh sách các cơ sở + số giấy chứng nhận đạt tiêu chuẩn (chưa bị thu hồi)
router.post("/",validateToken, async (req, res)=>{
    provinceManagement = getUserManagementArea(req, res);
    console.log(provinceManagement);
    const listOfDepartments = await Departments.findAll({ include:[{model: Certification, required: true, attributes:['id'], where:{disable : 0}}], where: {province: provinceManagement}});
    // const listOfDepartments = await Departments.findAll({ where: {province: provinceManagement}});

    res.json(listOfDepartments);
})

//----- tìm cơ sở theo id
router.post("/find/:id", validateToken, async (req, res)=>{
    provinceManagement = getUserManagementArea(req, res);
    console.log(provinceManagement);
    const id = req.params.id;
    const department = await Departments.findOne({where:{id:id, province: provinceManagement}, include:[{model: Certification, required: true, attributes:['id']}]});
    res.json(department);
})


//------- thêm cơ sở 
router.post("/create",validateToken, async(req, res)=>{
    const department = req.body.department; 
    try {
        await Departments.create(department);
        res.json(department);
    } catch (error) {
        console.log(error);
    }
})
// ------- sửa cơ sở
router.post("/edit/:id", validateToken, async (req, res)=>{
    const newDepartment = req.body.department; 
    const id = req.params.id;
    const department = await Departments.findOne({where:{id:id}});
    department.update({
        address: newDepartment.address,
        phoneNumber: newDepartment.phoneNumber,
        name: newDepartment.name,
        ownerName: newDepartment.ownerName,
        bussinessType: newDepartment.bussinessType,
        district: newDepartment.district,
        province: newDepartment.province,
        city: newDepartment.city
    });
    res.json(department);
})


// ------- xóa cơ sở
router.post("/delete/:id",async(req, res)=>{    
    const id = req.params.id;
    const cert = await Certification.destroy({where:{departmentsID: id}});
    const departmentTesting = await DepartmentTesting.destroy({where:{departmentID: id}});
    const department = await Departments.destroy({where:{id:id}});
    res.json("SUCCESS");
})



router.get("/test", async (req, res)=>{
    // const listOfDepartments = await Deparments.findAll();
    const departmenttest = await Departments.findAll({ include:[{model: DepartmentTesting, required: true}]});
    res.json(departmenttest);
})

module.exports = router;