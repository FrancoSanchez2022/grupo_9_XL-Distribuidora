let db = require('../../database/models')
const { Op } = require("sequelize");

module.exports = {


    paginacion: async (req, res) => {
        
        const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
       
        try {
            
          /*let dato = await db.Productos.findAndCountAll()

            return res.send(dato)*/

            let {orderBy, orderDirect, page, size, ...updateQuery} = req.query;

            const order = orderBy ? orderBy : 'id'
            const direction = orderDirect ? orderDirect : 'ASC'

            //console.log(updateQuery)

            for(let key in updateQuery) {
                
                if(key == 'nombre' || key == 'categoriasId' || key == 'marcasId') {

                    if(updateQuery[key] == null || updateQuery[key].trim().length == 0) {
                        delete updateQuery[key]
                    } else {
                        
                        if( key == 'nombre') {
                            updateQuery[key] = {[Op.substring]: req.query.nombre.trim()}
                        }
                    }

                } else {
                    delete updateQuery[key]
                    url.searchParams.delete(key)
                }
            }
            //console.log(updateQuery)
            const getPagination = (page, size) => {

                const limit = size ? +size : 5
                const offset = page ? (page-1) * limit : 0

                return  {limit, offset}
            }

            const {limit, offset} = getPagination(page, size);

            //return res.send(data)


            getPageData = (data, page, limit) => {

               
                const { count, rows: result } = data;
                const pages = Math.ceil(count / limit);
                const currentPage = page ? +page : 1;

                if (currentPage > pages) {
                    throw new SyntaxError(); // (*)
                } else {
                    let next_page = ""
                    let previous_page = ""

                    if (url.searchParams.has('page') ) {
                        if(!url.searchParams.has('size')) {
                            url.searchParams.set('size', limit)
                        }
                        if (currentPage == 1) {

                            url.searchParams.set('page', (currentPage + 1))
                            next_page = url.href

                        } else {
                            
                            url.searchParams.set('page', (currentPage - 1))
                            previous_page = url.href
                            url.searchParams.set('page', (currentPage + 1))
                            next_page = url.href
                        }
                    } else {

                        url.searchParams.set('page', (currentPage + 1));
                        url.searchParams.set('size', limit)
                        next_page = url.href

                    }
                    const next = (currentPage == pages) ? null : next_page;
                    const previous = (currentPage == 1) ? null : previous_page;

                    return { count, pages, previous, next, result }
                }
            
            }
            // incluimos las relaciones con marca y categoria para poder visualizarlos en las tablas(unicamente nos traemos los nombres)
            let data = await db.Productos.findAndCountAll({
                where: updateQuery,
                order: [[order, direction]],
                include : [
                    {
                        association : 'marca',
                        attributes: ['nombre']
                    },
                    {
                        association : 'category',
                        attributes: ['nombre']
                    }
                ],
                limit,
                offset
            })

            let {count, pages, previous, next, result} = getPageData(data, page, limit)
            //return res.send(dataPage)

            return res.status(200).json( {
                count,
                pages,
                next,
                previous,
                result
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Lo siento, ocurrio un error'
            })
        }
    }

}