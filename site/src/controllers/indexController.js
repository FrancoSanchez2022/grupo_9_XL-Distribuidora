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
    crearMensajes: (req,res) => {
        console.log(req.body);

        db.Mensajes.create({
            nombre:req.body.nombre,
            email:req.body.email,
            telefono:req.body.telefono,
            comentarios:req.body.comentarios,
        })
        .then(mensaje => {
            let response = {
                status: 200,
                meta: {
                    msg: "Mensaje Creado",
                    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: mensaje
            }
            return res.status(200).json(response)
        })
    },
    verMensajes: (req,res) => {
        console.log(req.body);

        db.Mensajes.findAll()
        .then(mensajes => {
            let response = {
                status: 200,
                meta: {
                    length: mensajes.length,
                    path: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data: mensajes
            }
            return res.status(200).json(response)
        })
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
            include: [{
                all: true
            }]
        })
        .then(productos => {
            return res.render('busqueda',{
                busqueda: elemento,
                productos
            })
        })
        .catch(error => res.send(error))
    },
}
