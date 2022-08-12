module.exports = {
    list: (req, res) => {
        return res.render('admin/listar')
    },
    create: (req, res) => {
        return res.render('admin/crear')
    },
    edit: (req, res) => {
        /*id = +req.params.id
        let producto = productos.find((elemento)) => {
            return elemento.id == id */
        /* return res.send(producto) Comprobar que esta llegando bien el elemento*/
        return res.render('admin/editar')
    }
}