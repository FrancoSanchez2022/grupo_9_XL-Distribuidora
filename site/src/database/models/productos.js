'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {

    static associate(models) {
      Productos.belongsTo(models.Categorias,{
        as: 'category',
        foreignKey: 'categoriasId'
      }),
      Productos.belongsTo(models.Productos,{
        as: 'marca',
        foreignKey: 'marcasId'
    }),
      Productos.hasMany(models.Imagenes,{
      as: 'imagenes',
      foreignKey: 'productosId',
      onDelete: 'cascade'
  })
  }
}
  Productos.init({
    nombre: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precio: DataTypes.INTEGER,
    descuento: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    categoriasId: DataTypes.INTEGER,
    marcasId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Productos;
};