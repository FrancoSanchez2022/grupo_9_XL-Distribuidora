let listado = require('./src/data/productos.json')

let imagenes = []

listado.forEach(producto =>{
    let imagen = {
      nombre: producto.imagenes[0],
      productoId: producto.id,
      createdAt: new Date,
      updatedAt: new Date
    }
    imagenes.push(imagen)
  })

  console.log(imagenes)