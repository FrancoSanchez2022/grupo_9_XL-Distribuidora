const {check,body} = require('express-validator')
const usuarios = require('../data/users.json')
const bcryptjs = require('bcryptjs')

module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email existente')
]
