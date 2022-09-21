const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const usuarios = require('../data/usuarios.json')
const { emitWarning } = require('process')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports ={
    register: (req,res) =>{
        return res.render('users/register')
    },
    processRegister: (req,res) =>{
        let errors = validationResult(req)

/*         if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        } */
        
 /*        if (errors.isEmpty()) {
            let {name,lastname,email,phone,pass} = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                name,
                lastname,
                email,
                phone,
                pass: bcrypt.hashSync(pass, 12),
                image: req.file.size > 1 ? req.file.filename : "default-avatar.png",
                rol: "usuario"
            }
            usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/') */
            if (errors.isEmpty()) {
                return res.send(req.body)
            
        } else {            
            /* return res.send(errors.mapped()) */
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    login: (req,res) =>{
        return res.render('users/login')
    },
    processLogin:(req,res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
        
/*             const {email,recordarme} = req.body
            let usuario = usuarios.find(user => user.email === email)

            req.session.userLogin = {
                id : usuario.id,
                nombre : usuario.name,
                image : usuario.image,
                rol : usuario.rol
            }
            if(recordarme){
                res.cookie('Crafsy',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24})
            }

            return res.redirect('/users/profile') */
            return res.send(req.body)
        } else {
            return res.send(errors.mapped())
/*             return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            }) */
        }
    },
    resetPassword: (req,res) =>{
        return res.render('users/resetPass')
    },
    profile: (req,res) =>{
        return res.render('users/profile')
    },
    logout : (req,res) => {
        return res.redirect('/')
    }
}