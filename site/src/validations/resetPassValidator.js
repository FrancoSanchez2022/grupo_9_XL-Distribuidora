const { check, body } = require('express-validator')
const db = require('../database/models')

module.exports = [
    /* Email */
    check('email').trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Email invalido')
        .custom((value, { req }) => {
            return db.Usuarios.findOne({ where: {email: req.body.email} })
                .then(user => {
                    if ((!user)) {
                        return Promise.reject()
                    }
                }).catch(() => {
                    return Promise.reject('El email no se encuentra registrado')
                })
        })

    // Custom validation
    /*         .custom(async (email) => { 
                const existingUser = await db.Usuarios.findOne( {email} )
                     
                if (!existingUser) {
                    throw new Error('El Email no se encuentra registrado')
                }
            }) */

]
