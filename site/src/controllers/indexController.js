const db = require('../database/models')
const { Op } = require("sequelize");
module.exports = {
    home: (req, res) => {
        let aside = db.Asides.findAll()
        let productos = db.Productos.findAll({
            include: ['category', 'marca', 'imagenes']
        })
        Promise.all([productos, aside])
            .then(([productos, aside]) => {
                return res.render('index',
                    {
                        aside,
                        productos
                    })
            })
            .catch(error => res.send(error))
    },
    search: (req, res) => {
        let elemento = req.query.search
        db.Productos.findAll({
            where : {
                [Op.or] : [
                    {nombre : {[Op.substring] : elemento}},
                    {descripcion : {[Op.substring] : elemento}}
                ]
            },
            includes: [{
                all: true
            }]
        })
        .then(productos => {

            return res.render('busqueda'),
            {
                busqueda: elemento,
                productos
            }})
        .catch(error => res.send(error))
    },
}
