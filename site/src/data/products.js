const fs = require ('fs')
let productos = require ('./productos.json');

/*Crear un nuevo producto */
 let nuevoProducto = {
    "id": 7,
    "marca": "Inoxy",
    "titulo": "Virulana",
    "categorias": "Limpieza",
    "precio": 70,
    "descuento": "",
    "descripcion": "Virulana inoxidable de larga duración.",
    "stock": 50,
    "imagenes": ["imagen6.webp"]
 }
/*Editar un producto */

let ProductEdit = productos.map((element,index) => {
    if (element.id === 6) {
        element.marca = "Sapphirus"
        element.titulo = "Difusor Automatico"
        element.precio =  2050
        element.stock = 10
    }
    return element
})

/* Eliminar un producto */

let eliminarProducto = productos.filter(element => element.id !==4);

console.log(eliminarProducto);

/*Pasamos el Objeto literal a un sting */
let string = JSON.stringify(eliminarProducto,null,4)
/*Subimos los cambios y actualizaciones al json */
fs.writeFileSync('./src/data/productos.json',string,'utf-8')