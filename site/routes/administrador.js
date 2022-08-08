const express = require ('express')
const router = express.Router()
const { create,edit,list } = require('../controllers/adminController')

/* GET admin page. */
router.get('/list',list)
router.get('/create', create)
router.get('/edit/:id', edit)

module.exports = router 