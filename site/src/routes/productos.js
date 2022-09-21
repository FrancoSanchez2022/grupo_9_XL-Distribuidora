const express = require ('express')
const router = express.Router()
const {cart,detail, list} = require('../controllers/productosControllers')

/* GET products listing. */
router.get('/cart', cart)
router.get('/detail/:id', detail)
router.get('/listProducts', list)

module.exports = router