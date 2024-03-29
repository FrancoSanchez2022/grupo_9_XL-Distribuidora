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
    .notEmpty().withMessage('Debe ingresar su clave'),

     body('pass')
    .custom((value,{req}) =>{

        return db.Usuarios.findOne({ where: {email: req.body.email} })
        .then(user => {
            if (!bcryptjs.compareSync(value, user.dataValues.password)){
            return Promise.reject()
        }
    })
    .catch(() =>{
        return Promise.reject('El email o la contraseña no coincide')
    })
})
]
