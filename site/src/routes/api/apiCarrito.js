const {listCart, addItem, modifyItem, removeItem, empty} = require('../../controllers/api/carrito');
const express = require('express');
const router = express.Router();

/* GET home page. */
//router.get('/products', paginacion);

// 
router.get("/", listCart) // mostrarnos todos los productos que tiene el carrito
router.post('/:id', addItem) // agrega un item/producto al carrito
router.delete("/item/:id", modifyItem) // modifica - aumeta/disminuye la cantidad del producto dentro del carrito
router.delete('/:id', removeItem) //eliminar un item/producto del carrito
router.delete("/empty", empty) // eliminar/vaciar el carrito


module.exports = router;