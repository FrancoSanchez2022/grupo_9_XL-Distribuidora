'use strict';

let listado = ["Aromatizantes","Detergentes","Desinfectantes","Fragancias","Higiene dental","Insecticida","Limpieza","Otros"]

let categorias = listado.map(categoria =>{
  
    let elemento = {
    nombre: categoria,
    createdAt: new Date,
    updatedAt: new Date
  }
  return elemento
})


module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Categorias', categorias, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};
