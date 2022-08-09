const express = require ('express')
const router = express.Router()
let { cart,detail} = require('../controllers/productosControllers')

router.get('/cart', cart)
router.get('/detail', detail)

module.exports = router