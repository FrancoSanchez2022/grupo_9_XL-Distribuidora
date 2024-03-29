const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../database/models')
const { devNull } = require('os')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        return res.render('users/register')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let { name, lastname, email, pass, phonenumber } = req.body

            db.Usuarios.create({
                nombreUsuario: null,
                nombre: name,
                apellido: lastname,
                genero: null,
                email: email,
                password: bcrypt.hashSync(pass, 12),
                telefono: phonenumber,
                pais: null,
                estado_provincia: null,
                ciudad: null,
                calle: null,
                codigoPostal: null,
                rolId: 2,
                imagen: "default-avatar.png"
            })

                .then(usuario => {
                    req.session.userLogin = {
                        id: usuario.id,
                        nombreUsuario: usuario.nombreUsuario,
                        nombre: usuario.nombre,
                        email: usuario.email,
                        apellido: usuario.apellido,
                        genero: usuario.genero,
                        telefono: usuario.telefono,
                        pais: usuario.pais,
                        estado_provincia: usuario.estado_provincia,
                        ciudad: usuario.ciudad,
                        calle: usuario.calle,
                        codigoPostal: usuario.codigoPostal,
                        imagen: usuario.imagen,
                        rol: usuario.rolId
                    }
                    return res.redirect('/')
                })
                .catch(errores => res.send(errores))
        } else {
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    login: (req, res) => {
        return res.render('users/login')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {

            const { email, recordarme } = req.body
            /*let usuario = usuarios.find(user => user.email === email)*/
            db.Usuarios.findOne({
                where: {
                    email
                }
            })
                .then(usuario => {
                    req.session.userLogin = {
                        id: usuario.id,
                        nombreUsuario: usuario.nombreUsuario,
                        nombre: usuario.nombre,
                        email: usuario.email,
                        apellido: usuario.apellido,
                        genero: usuario.genero,
                        telefono: usuario.telefono,
                        pais: usuario.pais,
                        estado_provincia: usuario.estado_provincia,
                        ciudad: usuario.ciudad,
                        calle: usuario.calle,
                        codigoPostal: usuario.codigoPostal,
                        imagen: usuario.imagen,
                        rol: usuario.rolId
                    }
                    if (recordarme) {
                        res.cookie('XL', req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 })
                    }
                    req.session.carrito = []

                    db.Ordenes.findOne({
                        where: {
                            usuariosId: req.session.userLogin.id,
                            status: 'pending'
                        },
                        include: [
                            {
                                association : 'carrito',
                                attributes: ['productosId', 'cantidad'],
                                include: [
                                    {
                                        association : 'producto',
                                        attributes: ['id', 'nombre', 'precio', 'descuento', 'stock'],
                                        include: [
                                            {
                                                association : 'imagenes',
                                                attributes: ['nombre']
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    })
                    .then(orden => {

                        if(!orden) {
                            console.log("El usuario logueado no tiene una orden pendiente")
                            return res.redirect('/users/profile')

                        } else {
                            console.log("El usuario logueado tiene una orden pendiente")
                            orden.carrito.forEach(item => {

                                let producto = {
                                    id: item.producto.id,
                                    nombre: item.producto.nombre,
                                    precio: item.producto.precio,
                                    descuento: item.producto.descuento,
                                    imagen: item.producto.imagenes[0].nombre,
                                    stock: item.producto.stock,
                                    cantidad: +item.cantidad,
                                    subtotal: (+item.producto.precio - (+item.producto.precio * +item.producto.descuento / 100)) * item.cantidad ,
                                    ordenId: orden.id ,
                                }
                                req.session.carrito.push(producto)
                            })
                            console.log(req.session.carrito)
                            return res.redirect('/users/profile')
                        }
                    })
                    .catch(err => res.send(err))

                    /* return res.send(req.body) */
                })
                .catch(errores => res.send(errores))

        } else {
            /* return res.send(errors.mapped()) */
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    forgotPass: (req, res) => {
        return res.render('users/forgotPass')
    },
    processForgotPass: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
    
    
            const user = db.Usuarios.findOne({
                where: { email: req.body.email }
            })
            if (!user) {
                return res.status(403).send({
                    message: 'No existe ese email'
                })
            }
    
            const token = jwt.sign({ id: user.id }, 'resetPassToken', { expiresIn: '1h' });
            db.Usuarios.update({
                tokenResetPassword: token}, {
                    where: {
                        id: +req.params.email
                    }
            });
    
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_PASS}`,
                    pass: `${process.env.EMAIL_ADDRESS}`,
                }
            });
            const emailPort = process.env.EMAIL_PORT || 3000;
    
            const mailOptions = {
                from: "xl.distribuidora.arg@gmail.com",
                to: `${user.email}`,
                subject: 'Enlace para recuperar su cuenta de XL-Distribuidora',
                text: `${emailPort}/recoverPassword/${user.id}/${token}`,
            };
    
            transporter.sendEmail(mailOptions, (err, res) => {
                if (err) {
                    console.error('Ha ocurrido un error:', err);
                } else {
                    console.log('Respuesta:', res);
                    res.status(200).json('El email para la recuperación ha sido enviado');
                }
            })
       /*  } catch (error) {
            res.status(500).send({
                message: 'Ha ocurrido un error', error
            })
        } */
    
        } else {
            return res.render('users/forgotPass', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    recoverPass: (req, res) => {
        return res.render('users/recoverPass')
    },
    processRecoverPass: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            return res.send(req.body)
        } else {
            return res.render('users/recoverPass', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    profile: (req, res) => {
        let aside = db.Asides.findAll()
        let productos = db.Productos.findAll({
            include: ['category', 'marca', 'imagenes']
        })
        Promise.all([productos, aside])
            .then(([productos, aside]) => {
                return res.render('users/profile',
                    {
                        aside,
                        productos
                    })
            })
            .catch(error => res.send(error))
      },


    uploadProfileImage: (req, res) => {

        let session = req.session.userLogin
        let id = +session.id

        let errors = validationResult(req)

        if (req.fileValidationError) {
            let image = {
                param: "avatar",
                msg: req.fileValidationError
            }
            errors.errors.push(image)
        }
        if (errors.isEmpty()) {
            db.Usuarios.findOne({
                where: { id: req.params.id }
            })
                .then(user => {
                    db.Usuarios.update({
                        imagen: req.file ? req.file.filename : user.imagen,
                    },
                        {
                            where: { id: req.params.id }
                        })
                        .then(image => {
                            return res.redirect('/users/profile');
                        })
                })
                .catch(errores => res.send(errores))
        }
        else {
            db.Usuarios.findOne({
                where: { id: req.params.id }
            })
                .then(user => {
                    if (req.file) {
                        /* return res.send(user) */
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
                    }
                    return res.render('users/profile', {
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(errores => res.send(errores))
            /* return res.send(errors.mapped()) */
        }

    },


    profileEdit: (req, res) => {

        return res.render('users/profileEdit');

    },
    profileEdit2: (req, res) => {

        /* console.log(req.body); */
        let errors = validationResult(req)

        if (req.fileValidationError) {
            let imagen = {
                param: 'avatar',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
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

                                    /* console.log(req.session);
                                    console.log(req.cookies.XL); */

                                    req.session.userLogin = {
                                        id: usuario.id,
                                        nombreUsuario: usuario.nombreUsuario,
                                        nombre: usuario.nombre,
                                        email: usuario.email,
                                        apellido: usuario.apellido,
                                        genero: usuario.genero,
                                        telefono: usuario.telefono,
                                        pais: usuario.pais,
                                        estado_provincia: usuario.estado_provincia,
                                        ciudad: usuario.ciudad,
                                        calle: usuario.calle,
                                        codigoPostal: usuario.codigoPostal,
                                        imagen: usuario.imagen,
                                        rol: usuario.rolId
                                    }
                                    res.cookie('XL', req.session.userLogin, { maxAge: 1000 * 60 * 60 * 24 })
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
    logout: (req, res) => {

        req.session.destroy();
        if (req.cookies.XL) {
            res.cookie('XL', '', { maxAge: -1 })
        }
        return res.redirect('/')
    }
}