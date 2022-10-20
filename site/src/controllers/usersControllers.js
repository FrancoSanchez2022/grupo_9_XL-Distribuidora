const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../database/models')
const { devNull } = require('os')

module.exports = {
    register: (req, res) => {
        return res.render('users/register')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let { name, lastname, email,pass,phonenumber} = req.body
             
            db.Usuarios.create({
                nombreUsuario: null,
                nombre: name,
                apellido : lastname,
                género : null,
                email : email,
                password: bcrypt.hashSync(pass, 12) ,
                teléfono: phonenumber,
                pais: null,
                estado_provincia: null,
                ciudad: null,
                calle: null,
                códigoPostal: null,
                rolId: 2,
                imagen: "default-avatar.png"
            })

           .then(usuario => {
            req.session.userLogin = {
                id : usuario.id,
                nombreUsuario: usuario.nombreUsuario,
                nombre: usuario.nombre,
                email: usuario.email,
                apellido: usuario.apellido,
                género: usuario.género,
                teléfono: usuario.teléfono,
                pais: usuario.pais,
                estado_provincia: usuario.estado_provincia,
                ciudad: usuario.ciudad,
                calle: usuario.calle,
                códigoPostal: usuario.códigoPostal,
                imagen : usuario.imagen,
                rol : usuario.rolId
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
        
             const {email,recordarme} = req.body
            /*let usuario = usuarios.find(user => user.email === email)*/
            db.Usuarios.findOne({
                where : {
                    email
                }
            })
            .then(usuario => {
                req.session.userLogin = {
                    id : usuario.id,
                    nombreUsuario: usuario.nombreUsuario,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    apellido: usuario.apellido,
                    género: usuario.género,
                    teléfono: usuario.teléfono,
                    pais: usuario.pais,
                    estado_provincia: usuario.estado_provincia,
                    ciudad: usuario.ciudad,
                    calle: usuario.calle,
                    códigoPostal: usuario.códigoPostal,
                    imagen : usuario.imagen,
                    rol : usuario.rolId
                }
                if(recordarme){
                    res.cookie('XL',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24})
                }
                return res.redirect('/users/profile')
            })    
            .catch(errores => res.send (errores)) 
        } else {
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    resetPass: (req, res) => {
        return res.render('users/resetPass')
    },
    processResetPass: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            return res.send(req.body)
        } else {
            return res.render('users/resetPass', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    profile: (req, res) => {
        return res.render('users/profile')
    },
    logout: (req, res) => {

        req.session.destroy();
        if(req.cookies.XL){
            res.cookie('XL','',{maxAge: -1})
        }
        return res.redirect('/')
    },
    uploadProfileImage: (req, res) => {

        

        let session = req.session.userLogin
        let id = +session.id

        let errors = validationResult(req)

        if(req.fileValidationError) {
            let image = {
                param : "avatar",
                msg : req.fileValidationError
            }
            errors.errors.push(image)
        }
        if (errors.isEmpty()){
            db.Usuarios.forEach(user => {
                if (user.id === id) {
                    /* return res.send(user) */
                    let ruta = fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'users', user.imagen))
                    if(ruta && req.file.filename  !== user.imagen&& user.imagen !== "default-avatar.png"){
                        fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'users', user.imagen))
                    }
                    user.imagen = req.file ? req.file.filename : user.imagen
                }
            })
           /*  db.Usuarios.update(db.Usuarios); */
            return res.redirect('/users/profile');

        }else{
            /* return res.send(errors.mapped()) */
            return res.render('/users/profile',{
                errors : errors.mapped(),
                old : req.body
            })
        }


    },
    profileEdit: (req, res) => {
        return res.render('users/profile')
    }
}