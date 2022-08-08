const express = require ('express')
const router = express.Router()
const { carrito,detalle} = require('../controllers/productosControllers')

/* GET products listing. */
router.get('/cart', carrito)
router.get('/detail', detalle)

module.exports = router