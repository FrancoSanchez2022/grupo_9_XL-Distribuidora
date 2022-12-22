'use strict';

let listado = require('../../../src/data/users.json')

let usuarios = listado.map(usuario =>{
  let elemento = {
  nombreUsuario: usuario.username,
  nombre: usuario.name,
  apellido: usuario.lastname,
  genero: usuario.gender,
  email: usuario.email,
  password: usuario.pass,
  telefono: usuario.phonenumber,
  pais: usuario.country,
  estado_provincia: usuario.state,
  ciudad: usuario.city,
  calle: usuario.streetname,
  codigoPostal: usuario.postalcode,
  imagen: usuario.image,
  rolId: usuario.rol === 'Admin' ? 1 : 2,
  createdAt: new Date,
  updatedAt: new Date
  }
  return elemento
})


module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Usuarios', usuarios, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
