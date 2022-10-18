'use strict';

let listado = ['Admin','Usuario']

let rolesDeUsuarios = listado.map(rol =>{
  
    let elemento = {
    nombre: rol,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})


module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Roles', rolesDeUsuarios, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
