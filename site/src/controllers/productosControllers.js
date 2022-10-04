let aside= require('../data/aside.json')
/*let productos = require('../data/productos.json');*/
const db = require('../database/models');
let Sequelize = require('sequelize')

module.exports ={
    detail: (req,res) =>{
        let idParams= +req.params.id;
        db.Productos.findOne({
            where : {
                id : idParams
            },
            include : [{
                all : true
            }]
        })
        .then(producto => {

            db.Productos.findAll({
                where : {
                    categoriaId: productos.categoriaId
                },
                limit : 4,
                order : [[Sequelize.literal("RAND()")]],
                include : [{
                    all : true
            }]
            })
            .then(productos => {
            return res.render('productDetail',{
                producto,
                productos
            })
        })})
        .catch(error => res.send(error))
        let producto= productos.find(producto => {
            return producto.id === idParams
        } ) 
        /* return res.send(productAencontrar) */
        return res.render('productDetail',{producto, productos} )

    },
    cart: (req,res) =>{
        return res.render('productCart',{productos,aside})

    },
    list: (req,res) =>{
        return res.render('listProducts',{productos})
    },
    categoria : (req,res) => {
        let categoriaSeleccionada = req.params.categoria
        db.Categorias.findOne({
            where : {
                nombre : categoriaSeleccionada
            },
            include : [{
                association : 'productos',
                include: [{
                    all : true
                }]
            }]
        })
        .then(categorias => {
           return res.render('products',{
                categorias
            })
        })
        .catch(error => res.send(error))

    },
}
