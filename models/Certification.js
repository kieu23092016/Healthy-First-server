module.exports = (sequelize, Datatypes)=>{
    const Certification = sequelize.define("Certification", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        initialDate:{
            type: Datatypes.DATE,
            allowNull: false
        },
        expiredDate:{
            type: Datatypes.DATE,
            allowNull: false
        },
        disable: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
        }
    }, {timestamps:false})
    return Certification;
}