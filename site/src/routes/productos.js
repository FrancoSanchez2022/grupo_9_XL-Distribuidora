const express = require ('express')
const router = express.Router()
const {cart,detail} = require('../controllers/productosControllers')

/* GET products listing. */
router.get('/cart', cart)
router.get('/detail/:id', detail)

module.exports = router