const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) =>{
    const accessToken = req.header("accessToken");

    if (!accessToken) return res.json({error: "User not loggin!"});

    try{
        const validToken = verify(accessToken, "importansecret");

        if(validToken){
            return next();
        }
    } catch(error){
        return res.json({error: err});
    }
}

module.exports = {validateToken};