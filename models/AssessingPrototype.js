module.exports = (sequelize, Datatypes)=>{
    const AssesingPrototype = sequelize.define("AssesingPrototype", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Datatypes.INTEGER
        },
        assessingResult:{
            type: Datatypes.STRING,
            allowNull: false
        },
        resultDate:{
            type: Datatypes.DATE,
            allowNull: false
        }
    }, {timestamps:false})
    return AssesingPrototype;
}