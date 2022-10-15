'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuarios.belongsTo(models.Roles,{
        as : 'rol',
        foreignKey: 'rolId'
      })
    }
  }
  Usuarios.init({
    nombreUsuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    género: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    pais: DataTypes.STRING,
    estado_provincia: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    calle: DataTypes.STRING,
    códigoPostal: DataTypes.INTEGER,
    teléfono: DataTypes.STRING,
    imagen: DataTypes.STRING,
    rolId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};