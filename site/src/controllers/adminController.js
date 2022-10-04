const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')
const {validationResult} = require('express-validator');
let db = require('../database/models')

module.exports = {
    list: (req, res) => {

        db.Productos.findAll({
            include : [{
                all: true
            }]
        })
        .then (productos => {
            return res.render('admin/listar', {
                productos,
                redirection: "history"
            })
        })
    },
    create: async (req, res) => {
        try {
            let categorias = db.Categorias.findAll()
            let marcas = db.Marcas.findAll()
            return res.render('admin/crear',{
                categorias,
                marcas
            })
            
        } catch (error) {
            return res.send(error)
        }
    },
    store: async (req, res) => {



        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

        if (errors.isEmpty()) {
            try {
            let img = req.files.map(imagen => {
                    return imagen.filename
                })
            
            let { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body
            
            let productoNuevo = await db.Productos.create ({
                id: productos[productos.length - 1].id + 1,
                marcaId: marca,
                nombre: titulo,
                categoriaId: categoria,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,

            })
            await img.forEach(imagen => {
                db.Imagenes.create({
                    nombre: imagen,
                    productosId: productoNuevo.id
                })

            })

            return res.redirect('/admin/list')
        }catch(error){
            return res.send(error)
        }
        } else {
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', dato))

            req.files.forEach(imagen => {
                if (ruta(imagen) && (imagen !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', imagen))
                }
            })
            /* return res.send(errors.mapped()) */
            return res.render('admin/crear', {
                errors: errors.mapped(),
                old: req.body
            })
        }
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
        const idParams = +req.params.id
        const { Marca, Titulo, Categoria, Precio, Descuento, Stock, Descripcion } = req.body
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
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
            return res.redirect('/admin/listar')
        } else {
            /* return res.send(errors.mapped()) */
            return res.render('admin/crear', {
                errors: errors.mapped(),
                old: req.body
            })
        }
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
        let lastId = productos[productos.length - 1].id + 1
        productoParaRestaurar.id = lastId

        productos.push(productoParaRestaurar)
        guardar(productos)

        let historialModificado = historial.filter(producto => producto.id !== idParams)
        guardarHistorial(historialModificado)

        return res.redirect('/admin/list')
    },
    crash: (req, res) => {
        idParams = +req.params.id

        let producto = historial.find(product => product.id === idParams)
        let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', dato))

        producto.imagenes.forEach(imagen => {
            if (ruta(imagen) && (imagen !== "default-image.png")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', imagen))
            }
        })

        let historialModificado = historial.filter(producto => producto.id !== idParams)
        guardarHistorial(historialModificado)

        return res.redirect('/admin/list')
    },
}
