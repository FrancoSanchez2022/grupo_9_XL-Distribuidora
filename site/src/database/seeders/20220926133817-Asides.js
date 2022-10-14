'use strict';

let listado = require('../../data/aside.json')

let asides = listado.map(aside =>{
  
  function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return{
    titulo: aside.titulo,
    imagen: aside.imagen,
    usuariosId: random(1, 5),
    createdAt: new Date,
    updatedAt: new Date
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Asides', asides, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Asides', null, {});
  }
};