'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marcas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Marcas.hasMany(models.Productos,{
        as: 'productos',
        foreignKey: 'marcasId'
      })
      Marcas.hasMany(models.Historiales,{
        as: 'historiales',
        foreignKey: 'marcasId'
      })
    }
  }
  Marcas.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Marcas',
  });
  return Marcas;
};