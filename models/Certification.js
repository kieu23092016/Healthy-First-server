module.exports = (sequelize, Datatypes)=>{
    const Certification = sequelize.define("Certification", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        issuseOn:{
            type: Datatypes.DATE,
            allowNull: false
        },
        expiredDate:{
            type: Datatypes.DATE,
            allowNull: false
        }
    }, {timestamps:false})
    // Certification.associate = (models)=>{
    //     Certification.belongsTo(models.Departments)
    // }
    return Certification;
}