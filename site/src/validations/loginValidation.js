const {check,body} = require('express-validator')
const bcryptjs = require('bcryptjs')
const db = require('../database/models')

module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Clave */
    check('pass').trim()
    .notEmpty().withMessage('Debe ingresar su clave').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

     body('pass')
    .custom((value,{req}) =>{

        return db.Usuarios.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(user => {
            if (bcryptjs.compareSync(value, user.dataValues.password)){
            return Promise.reject()
        }
    })
    .catch(() => Promise.reject('El email o la contraseña no coincide'))
})
]
