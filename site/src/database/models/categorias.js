'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categorias.hasMany(models.Productos,{
        as: 'productos',
        foreignKey: 'categoriasId'
      })
      Categorias.hasMany(models.Historiales,{
        as: 'historiales',
        foreignKey: 'categoriasId'
      })
    }
  }
  Categorias.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorias',
  });
  return Categorias;
};