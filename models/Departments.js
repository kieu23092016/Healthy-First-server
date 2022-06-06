module.exports = (sequelize, Datatypes)=>{
    const Departments = sequelize.define("Departments", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        address:{
            type: Datatypes.STRING,
            allowNull: false
        },
        phoneNumber:{
            type: Datatypes.STRING,
            allowNull: false
        },
        name:{
            type: Datatypes.STRING,
            allowNull: false
        },
        ownerName:{
            type: Datatypes.STRING,
            allowNull: false
        },
        bussinessType:{
            type: Datatypes.STRING,
            allowNull: false
        },
        district:{
            type: Datatypes.STRING,
            allowNull: false
        },
        province:{
            type: Datatypes.STRING,
            allowNull: false
        },
        city:{
            type: Datatypes.STRING,
            allowNull: false
        }
    }, {timestamps:false})
    //departmentID
    Departments.associate = (models)=>{
        Departments.hasMany(models.Certification, {foreignKey: 'departmentsId'})
        models.Certification.belongsTo(Departments,{foreignKey:'departmentsId'})
        Departments.hasMany(models.DepartmentTesting, {foreignKey: 'departmentId'})
        models.DepartmentTesting.belongsTo(Departments,{foreignKey:'departmentId'})
    }
    // Departments.associate = (models)=>{
        
    // }
    return Departments;
}