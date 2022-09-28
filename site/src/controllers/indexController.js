let aside= require('../data/aside.json')
let productos = require('../data/productos.json')


module.exports = {
    home : (req,res) => {
        return res.render('index', 
        {
            aside,
            productos
        });
    },
    search: (req, res) => {
        let elemento = req.query.search

        let resultados = productos.filter(producto => {
            return producto.marca.toLowerCase() === elemento.toLowerCase() || (producto.titulo.toLowerCase().includes(elemento.toLowerCase())) /* || (producto.descripcion.toLowerCase().includes(elemento.toLowerCase())) */
        })
        return res.render('search', 
        {
            busqueda: elemento,
            resultados
        });
    }
}
