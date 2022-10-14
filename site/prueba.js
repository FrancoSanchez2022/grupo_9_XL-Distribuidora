let listado = require('./src/data/productos.json')

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
    if((elemento.toLowerCase()) === (producto.marca.toLowerCase())){
      return marca = index + 1
    }
  });
  let nuevo= {
    nombre: producto.titulo,
    stock: producto.stock,
    precio: producto.precio,
    descuento: producto.descuento,
    descripcion: producto.descripcion,
    categoriasId: categoria,
    marcasId: marca,
    createdAt: new Date,
    updatedAt: new Date
  }
  productos.push(nuevo)
})

console.log(productos)