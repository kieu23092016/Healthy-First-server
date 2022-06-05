const express = require('express');
const router = express.Router();
const {Deparments} = require('../models');

router.post("/", async(req, res)=>{
    const department = req.body; 
    try {
        await Deparments.create(department);
        res.json(department);
    } catch (error) {
        console.log(error);
    }
})

router.get("/", async (req, res)=>{
    const listOfDepartments = await Deparments.findAll();
    res.json(listOfDepartments);
})

module.exports = router;