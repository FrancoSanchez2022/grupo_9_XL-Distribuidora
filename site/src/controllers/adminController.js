const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const db = require('../database/models')
const { validationResult } = require('express-validator');
const users = require('../data/users.json')

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
        let categorias = db.Categorias.findAll()
        let marcas = db.Marcas.findAll()
        Promise.all([categorias, marcas])
            .then(([categorias, marcas]) => {
                return res.render('admin/crear', {
                    categorias,
                    marcas
                })
            })
            .catch(error => res.send(error))
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
            console.log(req.body)
            let { marca, titulo, categoria, precio, descuento, stock, Descripcion } = req.body

            db.Productos.create({
                nombre: titulo,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion: Descripcion,
                categoriasId: +categoria,
                marcasId: +marca,
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
                            .then(imagen => {
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
        let idParams = +req.params.id

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
                return res.render('admin/editar', {
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
            const { marca, Titulo, categoria, Precio, Descuento, Stock, Descripcion } = req.body
            let producto = db.Productos.findOne({
                where: {
                    id: idParams
                },
                include: [{
                    all: true
                }]
            })
            let actualizacion = db.Productos.update({
                nombre: Titulo,
                precio: +Precio,
                descuento: +Descuento,
                stock: +Stock,
                descripcion: Descripcion,
                categoriasId: +categoria,
                marcasId: +marca,
            }, {
                where: {
                    id: idParams
                }
            })

            Promise.all([producto, actualizacion])
                .then(([producto, actualizacion]) => {
                    if (req.files) {
                        db.Imagenes.update({
                            nombre: req.files[0].filename,
                            productosId: producto.id
                        }, {
                            where: {
                                id: producto.imagenes[0].id
                            }
                        })
                            .then(data => {
                                let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', dato))
                                if (ruta(producto.imagenes[0].nombre) && (producto.imagenes[0].nombre !== "default-image.png")) {
                                    fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', producto.imagenes[0].nombre))
                                }
                                return res.redirect('/admin/list')
                            })
                            .catch(error => res.send(error))
                    } else {
                        return res.redirect('/admin/list')
                    }
                })
                .catch(error => res.send(error))
        } else {
            return res.render('admin/crear', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    destroy: (req, res) => {

        let idParams = +req.params.id
        db.Productos.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
            .then(producto => {

                db.Historiales.create({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    descuento: producto.descuento,
                    stock: producto.stock,
                    descripcion: producto.descripcion,
                    categoriasId: producto.categoriasId,
                    marcasId: producto.marcasId,
                })
                    .then(historial => {

                        db.HistorialImagenes.create({
                            nombre: producto.imagenes[0].nombre,
                            historialId: historial.id
                        })
                            .then(imagen => {
                                db.Productos.destroy({
                                    where: {
                                        id: idParams
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
            include: [{
                all: true
            }]
        })
            .then(historial => {
                /* return res.send(historial) */
                return res.render('admin/listar', {
                    productos: historial,
                    redirection: "list"
                })
            })

    },
    restore: (req, res) => {
        const idParams = +req.params.id
        db.Historiales.findOne({
            where: {
                id: +req.params.id
            },
            include: [{
                all: true
            }]
        })
            .then(historialProducto => {
                db.Productos.create({
                    nombre: historialProducto.nombre,
                    precio: historialProducto.precio,
                    descuento: historialProducto.descuento,
                    stock: historialProducto.stock,
                    descripcion: historialProducto.descripcion,
                    categoriasId: historialProducto.categoriasId,
                    marcasId: historialProducto.marcasId,
                })
                    .then(productoNuevo => {
                        console.log(historialProducto)
                        db.Imagenes.create({
                            nombre: historialProducto.imagenes[0].nombre,
                            productosId: productoNuevo.id
                        })
                            .then(imagen => {
                                db.Historiales.destroy({
                                    where: {
                                        id: idParams
                                    }
                                })
                                    .then(eliminar => {
                                        return res.redirect('/admin/list')
                                    })
                            })
                    })
            })
            .catch(errores => res.send(errores))
    },
    crash: (req, res) => {
        idParams = +req.params.id

        db.Historiales.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
            .then(producto => {
                let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', dato))

                producto.imagenes.forEach(imagen => {
                    if (ruta(imagen.nombre) && (imagen.nombre !== "default-image.png")) {
                        fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', imagen.nombre))
                    }
                })
                db.Historiales.destroy({
                    where: {
                        id: idParams
                    }
                })
                    .then(eliminar => {
                        return res.redirect('/admin/list')
                    })
            })
            .catch(errores => {
                res.send(errores)
            })
    },

    dashboard: (req, res) => {
        res.render('admin/index')
    },
    userList: (req, res) => {
        let usuarios = db.Usuarios.findAll({
            include: [{ all: true }]
        })
        Promise.all([usuarios])
            .then(([usuarios]) => {


                return res.render('admin/userList', {
                    usuarios
                })

            })
            .catch(error => res.send(error))

    },
    addUser: (req, res) => {
        res.render('admin/userCreate')
    },
    processAddUser: (req, res) => {
        let errors = validationResult(req)

        if (req.fileValidationError){
            let imagen = {
                param: 'avatar',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            let { rol, name, lastname, email, pass, phonenumber } = req.body
            db.Usuarios.create({
                rolId: +rol,
                nombreUsuario: null,
                nombre: name,
                apellido: lastname,
                genero: null,
                email: email,
                telefono: phonenumber,
                password: pass,
                pais: null,
                estado_provincia: null,
                ciudad: null,
                calle: null,
                codigoPostal: null,
                imagen: req.file ? req.file.filename : "default-avatar.png"
            })
                .then(usuarioNuevo => {
                    return res.redirect('/admin/users')
                })
                .catch(errores => res.send(errores))
        } else {
            return res.render('admin/userCreate', {
                errors: errors.mapped(),
                old: req.body
            })
        }  
    },
    editUser: (req, res) => {
        let idParams = +req.params.id

        let usuario = db.Usuarios.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
        Promise.all([usuario])
        .then(([usuario]) => {
            return res.render('admin/userEdit', {
                usuario
            })
        })
        .catch(error => res.send(error))
    },
    processEditUser: (req, res) => {
   /* console.log(req.body); */

   if (req.fileValidationError) {
    let imagen = {
        param: 'avatar',
        msg: req.fileValidationError,
    }
    errors.errors.push(imagen)
}
let errors = validationResult(req)
if (errors.isEmpty()) {

    db.Usuarios.findOne({
        where: {
            id: +req.params.id
        }
    })
        .then(user => {
            user = user.dataValues
            /* console.log(user); */

            const { nombreUsuario, nombre, email, apellido, genero, telefono, pais, estado_provincia, ciudad, calle, codigoPostal } = req.body
            db.Usuarios.update({
                nombreUsuario: nombreUsuario,
                nombre: nombre,
                email: email,
                apellido: apellido,
                genero: genero,
                telefono: telefono,
                pais: pais,
                estado_provincia: estado_provincia,
                ciudad: ciudad,
                calle: calle,
                codigoPostal: codigoPostal,
                imagen: req.file ? req.file.filename : user.imagen
            }, {
                where: {
                    id: +req.params.id
                }
            })
                .then(data => {
                    db.Usuarios.findOne({
                        where: {
                            id: +req.params.id
                        }
                    }) /* .then(user => {
                if (req.file) {
                    let ruta = fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'users', user.imagen))
                    if (ruta && req.file.filename !== user.imagen && user.imagen !== "default-avatar.png") {
                        fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'users', user.imagen))
                    }
                    db.Usuarios.update({
                        imagen: req.file ? req.file.filename : user.imagen
                    }, {
                        where: {
                            id: +req.params.id
                        }
                    })
                }}) */
                        .then(usuario => {
                            usuario = usuario.dataValues

                      
                            req.session.save((err) => {
                                req.session.reload((err) => {
                                    return res.redirect('/users/profile')
                                });
                            });
                        });
                })
        })

        .catch(err => res.send(err))

} else {
    return res.render('users/profileEdit', {
        errors: errors.mapped(),
        old: req.body
    })
}
},
    deleteUser: (req, res) => {
        let idParams = +req.params.id
        db.Usuarios.destroy({
            where: {
                id: idParams
            }
        })        
        return res.redirect('/admin/users')
    }
}


