'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistorialImagenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HistorialImagenes.belongsTo(models.Historiales,{
        as: 'historial',
        foreignKey: 'historialId',
        onDelete:'cascade'
      })
    }
  }
  HistorialImagenes.init({
    nombre: DataTypes.STRING,
    historialId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistorialImagenes',
  });
  return HistorialImagenes;
};