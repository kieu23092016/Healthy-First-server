module.exports = (sequelize, Datatypes)=>{
    const Institution = sequelize.define("Institution", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        istitutionName:{
            type: Datatypes.STRING,
            allowNull: false
        },
        istitutionAddress:{
            type: Datatypes.STRING,
            allowNull: false
        },
        directorPhoneNumber:{
            type: Datatypes.STRING,
            allowNull: false
        },
        signDate:{
            type: Datatypes.DATE,
            allowNull: false
        },
        signNotebook:{
            type: Datatypes.STRING,
            allowNull: false
        },
    }, {timestamps:false})
    Institution.associate = (models)=>{
        Institution.hasMany(models.AssesingPrototype, {foreignKey: 'institutionId'}),
        models.AssesingPrototype.belongsTo(Institution,{foreignKey:'institutionId'})
    }
    return Institution;
}