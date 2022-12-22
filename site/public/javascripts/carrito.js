const $ = (tag) => document.querySelector(tag);

const carrito = $("#carrito");

// petición a la API -> listado de carrito
const getCarrito = async () => {

    try {
        const response = await fetch('/api/carrito')
        const result = await response.json()

        //console.log(result)
        if (result.status === 200) {
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}
// Petición para agregar un producto al carrito -> al endpoint -> /api/carrito/id -> POST
const addItem = async (id) => {

    try {
        
        const response = await fetch(`/api/carrito/${id}`, {
            method : 'POST'
        })
        const result = await response.json()
        console.log(result)
        if(result.status === 200) {
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}

// Petición para eliminar un producto del carrito -> al endpoint -> /api/carrito/id -> DELETE
const removeItem = async(id) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

// Petición para modificar/disminuir la cantidad de un producto -> al endpoint -> /api/carrito/item/id -> DELETE
const modifyItem = async (id) => {
    try {
        


    } catch (error) {
        console.log(error)
    }
}

// Petición para vaciar todo el carrito -> al endpoint -> /api/carrito/empty -> DELETE
const empty = async (id) => {
    try {
        


    } catch (error) {
        console.log(error)
    }
}

// pintar en el dom la información del carrito
const cargarCarrito = (data) => {

    carrito.innerHTML = null;

    data.forEach(producto => {

        let item = `
        <article>
        <div class="imagenes">
            <img id="img" src="/images/productos/${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="detail">
            <h4><a id="nombre" href="/products/detail/${producto.id}">${producto.nombre}</a></h4>
            <div class="añadir-elementos">
                <button class="restar" onClick="modifyItem('${producto.id}')">-</button>
                <span ">${producto.cantidad}</span>
                <button class="agregar" onClick="addItem('${producto.id}')">+</button>
            </div>
            <div class="precio-descuento">
                <p id="precio-sin-descuento" class="precio-secundario">$ ${producto.precio}
                    <span id="descuento">${producto.descuento}%</span>-
                </p>
                <p id="precio-con-descuento" class="precio-principal">$ ${producto.precio}</p>
            </div>
        </div>
        <button class="eliminar-item" onClick="removeItem('${producto.id}')"><i class="fas fa-times"></i></button>
    </article>
        `
        carrito.innerHTML += item
    });

}

carrito && getCarrito()