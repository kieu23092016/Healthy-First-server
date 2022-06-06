module.exports = (sequelize, Datatypes)=>{
    const QualityInspection = sequelize.define("QualityInspection", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        inspectorName:{
            type: Datatypes.STRING,
            allowNull: false
        },
        result:{
            type: Datatypes.STRING,
            allowNull: false
        },
        startDate:{
            type: Datatypes.DATE,
            allowNull: false
        },
        endDate:{
            type: Datatypes.DATE,
            allowNull: false
        },
    }, {timestamps:false})
    QualityInspection.associate = (models)=>{
        QualityInspection.hasMany(models.DepartmentTesting, {foreignKey: 'qualityInspectionId'}),
        models.DepartmentTesting.belongsTo(QualityInspection,{foreignKey:'qualityInspectionId'})
    }
    return QualityInspection;
}