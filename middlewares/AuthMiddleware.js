const {verify} = require("jsonwebtoken");
const {Users} = require('../models');

const validateToken = (req, res, next) =>{
    console.log("chạy không");
    console.log(req.body);

    const accessToken = req.body.header.accessToken;

    // console.log("name");
    if (!accessToken) return res.json({error: "User not loggin!WTF"});

    try{
        const validToken = verify(accessToken, "importantsecret");

        if(validToken){
            console.log("thực hiện lệnh tiếp đi");
            return next();
        }
    } catch(error){
        return res.json({error: error});
    }
}

const getUserManagementArea = (req, res) =>{
    console.log("getProvince");
    const accessToken = req.body.header.accessToken;
    // console.log(accessToken);
    const validToken = verify(accessToken, "importantsecret");
    console.log(validToken);
    provinceManagement = validToken.provinceManagement;
    console.log(validToken.provinceManagement);
    return provinceManagement;
}

module.exports = {validateToken, getUserManagementArea};