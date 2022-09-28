const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const usuarios = require('../data/users.json')

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    register: (req, res) => {
        return res.render('users/register')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let { name, lastname, email, phonenumber, pass } = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                username: null,
                name,
                lastname,
                gender: null,
                email,
                pass: bcrypt.hashSync(pass, 10),
                phonenumber,
                country: null,
                state: null,
                city: null,
                streetname: null,
                postalcode: null,
                image: "default-avatar.png",
                rol: "usuario"
            }
            usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/users/login')    
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
            const usuarios = require('../data/users.json')
            const {email,recordarme} = req.body
            
            let usuario = usuarios.find(user => user.email === email)

            req.session.userLogin = {
                id : usuario.id,
                username : usuario.username,
                name : usuario.name,
                lastname : usuario.lastname,
                gender : usuario.gender,
                email : usuario.email,
                phonenumber : usuario.phonenumber,
                country : usuario.country,
                state : usuario.state,
                city : usuario.city,
                streetname : usuario.streetname,
                postalcode : usuario.postalcode,
                image : usuario.image,
                rol : usuario.rol
            }
            if(recordarme){
            res.cookie('helloCookie',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24})
            }
            /* return res.send(req.body) */
            return res.redirect('/users/profile')
        } else {
            /* return res.send(errors.mapped()) */
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
            /* return res.send(req.body) */
            return res.render('users/resetPass')
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
            usuarios.forEach(user => {
                if (user.id === id) {
                    /* return res.send(user) */
                    let ruta = fs.existsSync(path.join(__dirname, '..', 'public', 'img', 'users', user.image))
                    if(ruta && req.file.filename  !== user.image&& user.image !== "default-avatar.png"){
                        fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', 'users', user.image))
                    }
                    user.image = req.file ? req.file.filename : user.image
                }
            })
            guardar(usuarios);
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
        return res.render('users/profileEdit')
    },
    logout: (req, res) => {
        req.session.destroy();
        if(req.cookies.Crafsy){
            res.cookie('helloCookie','',{maxAge: -1})
        }
        return res.redirect('/')
    }
}