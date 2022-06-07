const express = require('express');
const router = express.Router();
const { validateToken, getUserManagementArea } = require('../middlewares/AuthMiddleware');

const {Departments} = require('../models');
const{DepartmentTesting} = require('../models');
const{QualityInspection} = require('../models');


//-------------Danh sách thanh kiểm tra (mã cơ sở + tên cơ sở)
router.post("/", async (req, res)=>{
     const listOfQualityInspection = await QualityInspection.findAll({include:[{model: DepartmentTesting, required: true, attributes:['id'], 
                                                                        include:[{model: Departments, required:"true", attributes:['id','name']}]}]});
    res.json(listOfQualityInspection);
})

//-----------lập kế hoạch (tạo thanh kiểm tra, departmentTesting mới)
router.post("/create", async(req, res)=>{
    const newInspection = req.body; 
    //for example just access the title: post.title
    // console.log(posts);
    try {
        inspection = await QualityInspection.create(newInspection.inspection);
        await DepartmentTesting.create({
            departmentId: newInspection.departmentId,
            qualityInspectionId: inspection.id
        })
        res.json(inspection);
    } catch (error) {
        console.log(error);
    }
})

//-----------Cập nhật thanh kiểm tra
router.post("/edit/:id", async (req, res)=>{
    const newInspection = req.body; 
    console.log(newInspection)
    const id = req.params.id;
    const inspection = await QualityInspection.findOne({where:{id:id}});
    inspection.update({
        startDate: newInspection.startDate,
        endDate: newInspection.endDate,
        result: newInspection.result,
        inspectorName: newInspection.inspectorName
    });
    res.json(inspection);
})
module.exports = router;