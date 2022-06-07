const express = require('express');
const router = express.Router();
const { validateToken, getUserManagementArea, checkAdmin } = require('../middlewares/AuthMiddleware');
const {Users} = require('../models');

//----- danh sách chuyên viên
router.post("/", validateToken, checkAdmin,async (req, res)=>{
    const listOfStaffs = await Users.findAll({where:{role: "staff"}});
    res.json(listOfStaffs);
})

//------ thêm chuyên viên (Register - User)
//------- sửa chuyên viên
router.post("/edit/:id", validateToken, checkAdmin, async (req, res)=>{
    const newStaff = req.body.staff; 
    const id = req.params.id;
    const staff = await Users.findOne({where:{id:id}});
    staff.update({
        address: newStaff.address,
        phoneNumber: newStaff.phoneNumber,
        name: newStaff.name,
        ownerName: newStaff.ownerName,
        bussinessType: newStaff.bussinessType,
        district: newStaff.district,
        province: newStaff.province,
        city: newStaff.city
    });
    res.json(staff);
})
// ------------ xóa chuyên viên
router.post("/delete/:id",validateToken, checkAdmin,async(req, res)=>{    
    const id = req.params.id;
    const staff = await Users.destroy({where:{id: id}});
    res.json("SUCCESS");
})


//---------------tìm chuyên viên
router.post("/find/:id", validateToken, checkAdmin, async (req, res)=>{
    const id = req.params.id;
    const staff = await Users.findOne({where:{id:id}});
    res.json(staff);
})

//---------------Thêm địa bàn cho nhiều chuyên viên
router.post("/addArea", async (req, res)=>{
    const newRequest = req.body; 
    const area = newRequest.area;
    for(let i in newRequest.staffs){
        id = newRequest.staffs[i];
        const staff = await Users.findOne({where:{id:id}});
        staff.update({managementArea: area});
    };
    res.json("SUCCESS");
})


module.exports = router;