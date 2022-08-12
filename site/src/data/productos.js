const fs = require('fs')
let productos = require('./productos.json');

let ultimoId = productos[productos.length - 1].id + 1

console.log(ultimoId);
/* Creamos un nuevo producto */
let nuevoProducto = {
    id: 7,
    marca: "Nokia",
    titulo: "Nokia 1100 un telefonazo y antirrobo",
    precio: 20000,
    descuento: 40,
    descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum numquam, placeat eius perferendis aspernatur doloribus aliquid, quibusdam aperiam hic a tenetur! Quis rem aut qui expedita ut aspernatur nisi officiis.",
    stock: 50,
    imagenes: [
        "Nokia 1100.jpg",
        "Nokia 1100 caja.webp",
        "Nokia 1100 extra.webp",
        "Nokia 1100 negro.jpg"
    ]
}

/* productos.push(nuevoProducto);
console.log(productos); */

/* Pasamos el Objeto literal a un string */
/* let string = JSON.stringify(productos,null,4) */
/* Subimos los cambios y actualizaciones al json */
/* fs.writeFileSync('./src/data/productos.json',string,'utf-8') */


/* Editar producto */
let ProduEdit = productos.map((element,index) => {
    if (element.id === 6) {
        element.marca = "Iphone"
        element.titulo = "Iphone 13 pro max plus extra super ultra violeta"
        element.precio = 530000
        element.stock = 3
    }
    return element
})

/* console.log(ProduEdit); */

/* Pasamos el Objeto literal a un string */
/* let string = JSON.stringify(ProduEdit,null,4) */
/* Subimos los cambios y actualizaciones al json */
/* fs.writeFileSync('./src/data/productos.json',string,'utf-8') */


/* Eliminar un producto */
let eliminarProducto = productos.filter(element => element.id !== 4)



/* Pasamos el Objeto literal a un string */
/* let string = JSON.stringify(eliminarProducto,null,4) */
/* Subimos los cambios y actualizaciones al json */
/* fs.writeFileSync('./src/data/productos.json',string,'utf-8') */