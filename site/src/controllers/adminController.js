const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')
const { validationResult } = require('express-validator');
let db = require('../database/models')

module.exports = {
    list: (req, res) => {

        db.Productos.findAll({
            include: [{
                all: true
            }]
        })
            .then(productos => {
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
            return res.render('admin/crear', {
                categorias,
                marcas
            })

        } catch (error) {
            return res.send(error)
        }
    },
    store: (req, res) => {

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            let { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body

            db.Productos.create({
                nombre: titulo,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,
                categoriasId: categoria,
                marcasId: marca,
            })
                .then(productoNuevo => {

                    if (req.files) {
                        let img = req.files.map(imagen => {
                            let nuevo = {
                                nombre: imagen.filename,
                                productosId: productoNuevo.id
                            }
                            return nuevo
                        })

                        db.Imagenes.bulkCreate(img)
                            .then(imagenes => {
                                return res.redirect('/admin/list')
                            })
                    } else {
                        db.Imagenes.create({
                            nombre: 'default-image.png',
                            productosId: productoNuevo.id
                        })
                            .then(imagenes => {
                                return res.redirect('/admin/list')
                            })
                    }
                })
                .catch(error => res.send(error))
        } else {
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', dato))

            req.files.forEach(imagen => {
                if (ruta(imagen) && (imagen !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', imagen))
                }
            })
            /* return res.send(errors.mapped()) */
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    edit: (req, res) => {
        idParams = +req.params.id

        let categorias = db.Categorias.findAll()
        let marcas = db.Marcas.findAll()
        let producto = db.Productos.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
        Promise.all([categorias, marcas, producto])
            .then(([categorias, marcas, producto]) => {
                /* return res.send(imagenes) //Comprobar que esta llegando bien el elemento */
                return res.render('admin/editarProducto', {
                    producto,
                    categorias,
                    marcas
                })
            })
            .catch(error => res.send(error))
    },
    update: (req, res) => {
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            const idParams = +req.params.id
            const { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body

            let producto = db.Productos.findOne({
                where: {
                    id: idParams
                },
                include: [{
                    all: true
                }]
            })
            let actualizacion = db.Productos.update({
                nombre: titulo,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,
                categoriasId: categoria,
                marcasId: marca,
            }, {
                where: {
                    id: idParams
                }
            })

            Promise.all([producto, actualizacion])
                .then(([producto, actualizacion]) => {
                    if (req.files) {
                        db.Imagenes.update({
                            nombre: req.file.filename,
                            productosId: producto.id
                        }, {
                            where: {
                                id: producto.imagenes.id
                            }
                        })
                            .then(data => {
                                return res.redirect('/admin/list')
                            })
                            .catch(error => res.send(error))
                    } else {
                        return res.redirect('/admin/list')
                    }})
                    .catch(error => res.send(error))
             } else {
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    destroy: (req, res) => {

        let idParams = +req.params.id
        db.Productos.findOne({
            where : {
                id : idParams
            },
            include : [{
                all:true
            }]
        })
        .then(producto => {

            db.Historiales.create({
                nombre: producto.nombre,
                precio: producto.precio,
                descuento: producto.descuento,
                stock: producto.stock,
                descripcion:producto.descripcion,
                categoriasId: producto.categoriasId,
                marcasId: producto.marcasId,
            })
            .then(historial => {

                let imagen1 = db.HistorialImagenes.create({
                    nombre: producto.imagenes[0].nombre,
                    historialId: historial.id
                })

                Promise.all([imagen1])
                .then(([imagen1])=>{
                    db.Productos.destroy({
                        where : {
                            id : idParams
                        }
                    })
                    .then(producto => {
                        return res.redirect('/admin/history')
                    })
                })
            })
        })
        .catch(error => res.send(error))
    },
    history: (req, res) => {
        db.Historiales.findAll({
            include : [{
                all : true
            }]
        })
        .then(historial => {
            /* return res.send(historial) */
            return res.render('admin/list', {
                productos: historial,
                redirection: "list"
            })
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
