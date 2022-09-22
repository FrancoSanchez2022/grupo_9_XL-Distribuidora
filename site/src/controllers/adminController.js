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

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }

        if (errors.isEmpty()) {
            let img = req.files.map(imagen => {
                return imagen.filename
            })
            let { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body

            let productoNuevo = {
                id: productos[productos.length - 1].id + 1,
                marca,
                titulo,
                categoria,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,
                imagenes: req.file ? req.file.filename : ['default-image.png']
            }


            productos.push(productoNuevo)
            guardar(productos)

            /* Redirecciona a la lista de productos */
            return res.redirect('/admin/list')
            /* Redirecciona al detalle del producto recien creado */
            /* res.redirect(`/products/detail/${productoNuevo.id}`) */
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
