'use strict';

let listado = ["Axe","Ala","Asepxia","Ariel","Ayudin","Cif","Colgate","Dove","Gilette","Higienol","Inoxy","Lisoform","LisoformZiploc","Listerine","Raid","Magistral","MrMusculo","Rexona","Off","Oral B","Otros","Virulana","Zorro3D"]

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
