'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Imagenes.belongsTo(models.Productos,{
        as: 'imagenes',
        foreignKey: 'ProductosId',
        onDelete: 'cascade'
    })
  }
}
  Imagenes.init({
    nombre: DataTypes.STRING,
    productosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Imagenes',
  });
  return Imagenes;
};