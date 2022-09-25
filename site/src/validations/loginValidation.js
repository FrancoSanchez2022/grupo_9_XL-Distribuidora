const {check,body} = require('express-validator')
const usuarios = require('../data/users.json')
const bcryptjs = require('bcryptjs')

module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Clave */
    check('pass').trim()
    .notEmpty().withMessage('Debe ingresar su clave').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

    body('email')
    .custom((value,{req}) =>{
        let usuario = usuarios.find(user => user.email === value && bcryptjs.compareSync(req.body.pass, user.pass))

        if (usuario) {
            return true
        }else{
            return false
        }
    })
    .withMessage('El email o la contraseña no coincide')
]
