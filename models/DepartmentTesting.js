module.exports = (sequelize, Datatypes)=>{
    const DepartmentTesting = sequelize.define("DepartmentTesting", {
        
    }, {timestamps:false})
    return DepartmentTesting;
}