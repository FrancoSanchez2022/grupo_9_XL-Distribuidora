'use strict';

let listado = require('../../data/productos.json')

let listadoCategorias = ["Aromatizantes","Detergentes","Desinfectantes","Fragancias","Higiene dental","Higiene personal","Insecticida","Limpieza","Repelente","Otros"]

let marcas = ["Axe","Ala","Asepxia","Ariel","Ayudin","Cif","Colgate","Dove","Gilette","Higienol","Inoxy","Lisoform","LisoformZiploc","Listerine","Raid","Magistral","MrMusculo","Rexona","Off","Oral B","Otros","Virulana","Zorro3D"]

let productos = []



listado.forEach(producto =>{
  let categoria
  let marca
  listadoCategorias.forEach((categoriaLista,index) => {
    if(categoriaLista === producto.categoria){
      return categoria = index + 1
    }
  });
  marcas.forEach((elemento,index) => {
    if((elemento.toUpperCase()) === (producto.marca.toUpperCase())){
      return marca = index + 1
    }
  });
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  let nuevo= {
    nombre: producto.titulo,
    stock: producto.stock,
    precio: producto.precio,
    descuento: producto.descuento,
    descripcion: producto.descripcion,
    categoriasId: random(1,8),
    marcasId: random(1,23),
    createdAt: new Date,
    updatedAt: new Date
  }
  productos.push(nuevo)
})

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Productos', productos, {});
  
    },
  
    async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Productos', null, {});
    }
  };
  