'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asides extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asides.init({
    titulo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    usuariosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asides',
  });
  return Asides;
};