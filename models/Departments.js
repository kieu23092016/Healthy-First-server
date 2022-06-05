module.exports = (sequelize, Datatypes)=>{
    const Deparments = sequelize.define("Deparments", {
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
    Deparments.associate = (models)=>{
        Deparments.hasOne(models.Certification)
    }
    return Deparments;
}