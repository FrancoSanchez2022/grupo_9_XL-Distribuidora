'use strict';

let listado = require('../../data/productos.json')

let listadoCategorias = ["Detergentes","Desinfectantes","Insectisida","Otros"]

let marcas = ["Magistral","Ala","Ariel"]

let productos = []



listado.forEach(producto =>{
  let categoria
  let marca
  listadoCategorias.forEach((categoriaLista,index) => {
    if(categoriaLista === producto.categoria){
      return categoria = index
    }
  });
  marcas.forEach((elemento,index) => {
    if((elemento.toUpperCase()) === (producto.marca.toUpperCase())){
      return marca = index + 1
    }
  });
  let nuevo= {
    nombre: producto.titulo,
    stock: producto.stock,
    precio: producto.precio,
    descuento: producto.descuento,
    descripcion: producto.descripcion,
    categoriasId: 1,
    marcasId: 1,
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
  