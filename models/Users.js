module.exports = (sequelize, Datatypes)=>{
    const Users = sequelize.define("Users", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        username:{
            type: Datatypes.STRING,
            allowNull: false
        },
        password:{
            type: Datatypes.STRING,
            allowNull: false
        },
        fullname:{
            type: Datatypes.STRING,
            allowNull:false
        },
        phonenumber:{
            type: Datatypes.STRING,
            allowNull:false
        },
        CCCD:{
            type: Datatypes.STRING,
            allowNull:false
        },
        role:{
            type: Datatypes.STRING,
            allowNull:false
        },
        managementArea:{
            type: Datatypes.STRING,
            allowNull:false
        }
    }, {timestamps:false})
    return Users;
}