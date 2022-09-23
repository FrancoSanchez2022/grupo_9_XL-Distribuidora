const {check} = require('express-validator')

module.exports = [
    /* Titulo */
    check('titulo').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min:5}).withMessage('Debe contener al menos 5 caracteres'),

    /* Marca */
    check('marca').trim()
    .notEmpty().withMessage('Este campo es obligatorio'),

    /* Precio */
    check('precio').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan numeros'),

    /* Descuento */
    check('descuento').trim()
    .isInt().withMessage('Solo se aceptan numeros'),

    /* Stock */
    check('stock').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan numeros'),

    /* Categoria */
    check('categoria').trim()
    .notEmpty().withMessage('Debe seleccionar una categoria'),

    /* Descripcion */
    check('descripcion').trim()
    .notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min:10}).withMessage('Debe contener al menos 10 caracteres'),
]
