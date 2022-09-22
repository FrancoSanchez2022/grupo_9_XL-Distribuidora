const {check,body} = require('express-validator')

module.exports = [
    /* Nombre */
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:3}).withMessage('Debe contener al menos 3 caracteres'),

    /* Apellido */
    check('lastname').trim()
    .notEmpty().withMessage('Debe ingresar su apellido').bail()
    .isLength({min:3}).withMessage('Debe contener al menos 3 caracteres'),

    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Teléfono */
    check('phone')
    .notEmpty().withMessage('Debe ingresar un número de teléfono válido'),
  
    /* Clave */
    check('pass')
    .notEmpty().withMessage('Debe ingresar una clave').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
    check('pass2')
    .notEmpty().withMessage('Debe repetir la clave').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres').bail(),

    /* Verificación de igualdad de claves */
    body('pass2')
    .custom((value,{req}) => value !== req.body.pass ? false : true)
    .withMessage('Las claves no coinciden')
]
