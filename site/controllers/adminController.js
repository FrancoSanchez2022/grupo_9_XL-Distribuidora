module.exports = {
    list: (req, res) => {
        return res.render('admin/listaProductos')
    },
    create: (req, res) => {
        return res.render('admin/crearProducto')
    },
    edit: (req, res) => {
        /*id = +req.params.id
        let producto = productos.find((elemento)) => {
            return elemento.id == id */
        /* return res.send(producto) Comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProducto')
    }
}