const $ = (tag) => document.querySelector(tag);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const iconCart = $('#cart-btn');
const cart = $('.cart-container');
const carrito = $("#carrito");

const getVentanaCarrito = async () => {

    try {
        const response = await fetch('/api/carrito')
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}
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
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}

// Petición para eliminar un producto del carrito -> al endpoint -> /api/carrito/id -> DELETE
const removeItem = async (id) => {

    try {
        const response = await fetch(`/api/carrito/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

    } catch (error) {
        console.log(error)
    }
}

// Petición para modificar/disminuir la cantidad de un producto -> al endpoint -> /api/carrito/item/id -> DELETE
const modifyItem = async (id) => {
    try {
        const response = await fetch(`/api/carrito/item/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.status === 200) {
            cargarVentanaCarrito(result.data)
            cargarCarrito(result.data)
        }

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

    let totalCarrito = 0
    data.forEach(producto => {

        let item =`
        <tr>
            <td>
                <div class="imagen">
                    <img src="/img/productos/${producto.imagen}" alt="producto1"></img>
                </div>
            </td>
            <td>
                <h4>${producto.nombre} </h4>
            </td>
            <td>
                <div class="boton2">
                <button onClick="modifyItem('${producto.id}')">-</button>
                    <small>${producto.cantidad}</small>
                    <button onClick="addItem('${producto.id}')">+</button>
                </div>
            </td>
            <td>
                <span class="precio">$ ${producto.precio}</span>
                <p id="precio-con-descuento" class="precio-principal">$  ${toThousand(Math.round(producto.precio - (producto.precio * producto.descuento / 100)))}</p>
            </td>
            <td>
            <button class="eliminar-item" onClick="removeItem('${producto.id}')"><i class="fas fa-times"></i></button>
            </td>
        </tr>
        `
        carrito.innerHTML += item
        totalCarrito += producto.subtotal
    });

    /*$('#subtotal').innerHTML = `$ ${toThousand(Math.round(totalCarrito))}`
    $('#total').innerHTML = `$ ${toThousand(Math.round(totalCarrito))}`*/

    let totales = `
        <tr>
            <td>Total: </td>
            <td></td>
            <td></td>
            <td></td>
            <td>$ ${toThousand(Math.round(totalCarrito))}</td>
        </tr>
        `
    $("#total").innerHTML = totales


}
const cargarVentanaCarrito = (data) => {
    console.log("Se cargaron los datos")
    //console.log(data)
    cart.innerHTML = ""

    if (data.length > 0) {
        let totalCarrito = 0

        data.forEach(producto => {
           
            let item = `
            <div class="cart-item">
                <span class="fas fa-times" onClick="removeItem('${producto.id}')"></span>
                <img src="/img/productos/${producto.imagen}"  alt="">
                <div class="content">
                    <h3>${producto.nombre}</h3>
                    <div class="price">$ ${toThousand(Math.round(producto.precio - (producto.precio * producto.descuento / 100)))}</div>
                    <div class="añadir-elementos">
                        <button class="restar" onClick="modifyItem('${producto.id}')">-</button>
                        <span ">${producto.cantidad}</span>
                        <button class="agregar" onClick="addItem('${producto.id}')">+</button>
                    </div>
                </div>
            </div>
            `
            cart.innerHTML += item
            totalCarrito += producto.subtotal
        })
        cart.innerHTML += `
        <div class="cart-puy">
            <span>Subtotal:</span>
            <span>$ ${toThousand(Math.round(totalCarrito))}</span>
            <a class="" href="/products/cart">Ir a mi carrito</a>
        </div>
        `
    } else {
        
        cart.innerHTML = `
            <h3 class="title">Mi carrito</h3>
            <p>Tenes que seleccionar un producto</p>
        `

    }

}


iconCart && iconCart.addEventListener('click', () => {
    cart.classList.toggle('active');
})

// cuando exista carrito(inicamente en la vista de carrito) se ejecutara la función getCarrito()
carrito && getCarrito()

// cuando exista el icono de carrito en el DOM se ejecuta la función de cargarVentanaCarrito()
iconCart && getVentanaCarrito()