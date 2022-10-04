'use strict';

let listado = ["Magistral","Ala","Ariel"]

let marcas = listado.map(marca =>{
  
    let elemento = {
    nombre: marca,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})


module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Marcas', marcas, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Marcas', null, {});
  }
};
