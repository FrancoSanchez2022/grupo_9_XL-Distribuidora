const express = require ('express')
const router = express.Router()
const {home, search,crearMensajes,verMensajes} = require('../controllers/indexController')
const db = require('../database/models')

/* GET home page. */
router.get('/', home)
router.get('/busqueda', search)
router.post('/crearMensajes', crearMensajes);
router.get('/mensajes', verMensajes);


router.get('/prueba', (req, res) => {
    db.Ordenes.findAll({
        /*usuariosId: req.session.userLogin.id,
        status: 'pending',*/
        include: [
            {
                association : 'carrito',
                attributes: ['productosId', 'cantidad'],
                include: [
                    {
                        association : 'producto',
                        attributes: ['id', 'nombre', 'precio', 'descuento', 'stock'],
                        include: [
                            {
                                association : 'imagenes',
                                attributes: ['nombre']
                            }
                        ]
                    }
                ]
            }
        ]
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => res.send(err))
})
module.exports = router