'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carritos.belongsTo(models.Usuarios,{
        as: 'usuario',
        foreignKey: 'usuariosId'
      })
      Carritos.belongsTo(models.Productos,{
        as: 'producto',
        foreignKey: 'productosId'
      })
      Carritos.belongsTo(models.Ordenes,{
        as: 'orden',
        foreignKey: 'ordenesId'
      })
    }
  }
  Carritos.init({
    usuariosId: DataTypes.INTEGER,
    productosId: DataTypes.INTEGER,
    ordenesId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carritos',
  });
  return Carritos;
};