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
                pass    /* : bcrypt.hashSync(pass, 12) */,
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

            return res.redirect('/')    
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
                nombre : usuario.name,
                image : usuario.image,
                rol : usuario.rol
            }
            if(recordarme){
                /* res.cookie('helloCookie',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24}) */
            }

            return res.redirect('/users/profile')
            /* return res.send(req.body) */
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
        return res.redirect('/')
    }
}