const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')
const {validationResult} = require('express-validator');

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
    , JSON.stringify(dato, null, 4), 'utf-8')
const guardarHistorial = (dato) => fs.writeFileSync(path.join(__dirname, '../data/historial.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    list: (req, res) => {
        return res.render('admin/listar', {
            productos,
            redirection: "history"
        })
    },
    create: (req, res) => {
        return res.render('admin/crear')
    },
    store: (req, res) => {

        let img = req.files.map(imagen => {
            return imagen.filename
        })
        /* return res.send(img)
 */
        let {marca,titulo,categoria,precio,descuento,stock,descripcion} = req.body
        
        let productoNuevo = {
            id: productos[productos.length - 1].id + 1,
            marca:marca,
            titulo:titulo,
            categorias:categoria,
            precio:+precio,
            descuento:+descuento,
            stock:+stock,
            descripcion:descripcion,
            imagenes: req.file ? req.file.filename : 'default-image.png' ,
        }

        productos.push(productoNuevo)
        guardar(productos)

        /* Redirecciona a la lista de productos */
       return res.redirect('/admin/list')
       
    },
    edit: (req, res) => {
        let categorias = ['Smartphones', 'Tablets', 'Notebooks']
        id = +req.params.id
        let producto = productos.find((elemento) => {
            return elemento.id == id
        })
        /* return res.send(producto) Comprobar que esta llegando bien el elemento*/
        return res.render('admin/editar', {
            producto,
            categorias
        })
    },
    update: (req, res) => {
        idParams = +req.params.id
        let { Marca, Titulo, Categoria, Precio, Descuento, Stock, Descripcion } = req.body

        productos.forEach(producto => {
            if (producto.id === idParams) {
                producto.marca = Marca
                producto.titulo = Titulo
                producto.categorias = Categoria
                producto.precio = +Precio
                producto.descuento = +Descuento
                producto.stock = +Stock
                producto.descripcion = Descripcion
            }
        })
        guardar(productos)
        return res.redirect('/admin/list')
    },
    destroy: (req, res) => {
        idParams = +req.params.id

        let productoParaEliminar = productos.find((elemento) => {
            return elemento.id == idParams
        })

        historial.push(productoParaEliminar)
        guardarHistorial(historial)

        let productosModificados = productos.filter(producto => producto.id !== idParams)
        guardar(productosModificados)

        return res.redirect('/admin/history')
    },
    history: (req, res) => {

        return res.render('admin/listar', {
            productos: historial,
            redirection: "list"
        })
    },
    restore: (req, res) => {
        idParams = +req.params.id

        let productoParaRestaurar = historial.find((elemento) => {
            return elemento.id == idParams
        })

        productos.push(productoParaRestaurar)
        guardar(productos)

        let historialModificado = historial.filter(producto => producto.id !== idParams)
        guardarHistorial(historialModificado)

        return res.redirect('/admin/list')
    },
    crash: (req, res) => {
        idParams = +req.params.id

        let producto = historial.find(productos => productos.id === id)

        let ruta = (dato) => fs.existsSync(path.join(dirname, '..', 'public', 'images', 'productos', dato))
        if (ruta(producto.image) && (producto.image !== "default-image.png")) {
            fs.unlinkSync(path.join(dirname, '..','public', 'images', 'productos', producto.image))//raramente saca la img XD
        }

        let historialModificado = historial.filter(producto => producto.id !== idParams)
        guardarHistorial(historialModificado)

        return res.redirect('/admin/list')
    },
}
