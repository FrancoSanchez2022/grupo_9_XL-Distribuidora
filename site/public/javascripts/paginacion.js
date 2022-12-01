window.onload = function () {


    console.log('Hola!')
    let url = new URL(`http://localhost:3000/api/products?page=1&size=5`);
    const tbody = document.getElementById('contain-tbody');
    const template = document.querySelector('#tempale-tbody').content;
    const ulPages = document.querySelector('#pages-links');
    const filter = document.querySelector('#filter');
    const fragment = document.createDocumentFragment(); 
    const sizes = document.querySelector('#size')

    console.log(template)
    //console.log(categoria)
    filter.addEventListener('change', (e) => {
        //console.log(e.target.value)

        if (e.target.value.trim().length != 0) {
            console.log('Ingreso 1')
            console.log(url.href)

            if (url.searchParams.has(e.target.name)) {

                if (e.target.name != "nombre" && e.target.value == 0) {
                    url.searchParams.delete(e.target.name)
                    //tbody.innerHTML = ""
                    //traerDatos(url.href);
                } else {
                    url.searchParams.set(e.target.name, e.target.value);
                }

            } else {
                url.searchParams.append(e.target.name, e.target.value)
            }
            //console.log(url.searchParams.toString())
            tbody.innerHTML = ""
            traerDatos(url.href);

        } else {
            console.log('Ingreso 2')
            console.log(url.href)
            if (url.searchParams.has(e.target.name)) {
                url.searchParams.delete(e.target.name)
                tbody.innerHTML = ""
                traerDatos(url.href);
            } 
            url.searchParams.delete(e.target.name)
        }
    })

    sizes.addEventListener("change", (e) => {
        url.searchParams.set(e.target.name, e.target.value)
        tbody.innerHTML = "",
        traerDatos(url.href);
    })

    ulPages.addEventListener('click', (e) => {
        e.preventDefault()
        //console.log(e.target.href)
        if(!e.target.classList.contains('disabled')) {
            tbody.innerHTML = ""
            traerDatos(e.target.href)
        }
    })


    // Función 'traerDatos' recibe una url por parametro
    // Se encarga de hacer la petición a la API y dependiendo de los resultados pinta en el DOM los resultados
    const traerDatos = async (url) => {
        try {
            
            // petición por fetch a la API
            let response = await fetch(url)
            let result = await response.json();

            //console.log(result) 
            // en caso de que haya resultados coincidentes con la consulta, ingresamos al bloque del IF
            if(result.count > 0) {
                console.log('Tus resultados')
                console.log(result.result)
                

                result.result.forEach(producto  => {
                    
                    template.querySelector('#id').textContent = producto.id
                    template.querySelector('#marca').textContent = producto.marca.nombre;
                    template.querySelector('#categoria').textContent = producto.category.nombre;
                    template.querySelector('#nombre').textContent = producto.nombre
                    template.querySelector('#stock').textContent = producto.stock
                    template.querySelector('#precio').textContent = producto.precio
                    template.querySelector('#descuento').textContent = producto.descuento
                    template.querySelector('#btn-edit').href = `/admin/edit/${producto.id}`
                    template.querySelector('#btn-delete').action = `/admin/destroy/${producto.id}?_method=DELETE` ;

                    const clone = template.cloneNode(true);
                    fragment.appendChild(clone)
                });

                console.log(fragment)
                tbody.appendChild(fragment);
                
                ulPages.innerHTML = ""

                if(result.previous != null ) {
                    ulPages.innerHTML += `<li class="page-item"><a class="page-link" href="${result.previous}" >Previous</a></li>`
                } else {
                    ulPages.innerHTML += `<li class="page-item disabled"><a class="page-link" href="">Previous</a></li>`
                }

                if(result.pages > 2) {
                    for (let i = 1; i < result.pages + 1; i++) {
                       
                        let link = new URL(url)
                        if(link.searchParams.get('page') == i) {
                            link.searchParams.set('page', i)
                            ulPages.innerHTML += `<li class="page-item disabled"><a class="page-link" href="${link.href}">${i}</a></li>`
                        } else {
                            link.searchParams.set('page', i)
                            ulPages.innerHTML += `<li class="page-item"><a class="page-link" href="${link.href}">${i}</a></li>`
                        }
                        
                    }
                }


                if (result.next != null) {
                    ulPages.innerHTML += `<li class="page-item"><a class="page-link" href="${result.next}">Next</a></li>`
                } else {
                    ulPages.innerHTML += `<li class="page-item disabled"><a class="page-link" href="">Next</a></li>`
                }

            // En caso de que no haya resultados, deberiamos enviar un msj al usuario informandolo
            } else {

            }

        } catch (error) {
            console.log(error)
        }
    }
    traerDatos(url.href)

}


/*
 <% productos.forEach(producto => { %>
                  <tr>
                      
                        <th scope="row"><a href="/admin/edit/<%= producto.id %>"><%= producto.id %> </a></th>
                        <td><a href="/admin/edit/<%= producto.id %>"><%= producto.marca.nombre %></a></td>
                        <td colspan="2"><a href="/admin/edit/<%= producto.id %>"><%= producto.nombre %></a></td>
                        <td><a href="/admin/edit/<%= producto.id %> "><%= producto.stock %></a></td>
                        <td><a href="/admin/edit/<%= producto.id %> "><%= producto.precio %></a></td>
                        <td><a href="/admin/edit/<%= producto.id %> "><%= producto.descuento %></a></td>
                        <td>
                            <div>
                              <% if (redirection !== "list") { %>
                                <a href="/admin/edit/<%= producto.id%>">
                                  <button type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                              </a>
                              <% }else{ %>
                                <form action="/admin/restore/<%= producto.id%>?_method=DELETE" method="post">
                                  <button type="submit" class="btn btn-success"><i class="fas fa-plane-departure"></i></button>
                                </form>
                              <% } %>
                                <% if (redirection !== "list") { %>
                                  <form action="/admin/destroy/<%= producto.id%>?_method=DELETE" method="post">
                                    <button type="submit" id="eliminar-producto" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                  </form>
                                <% }else{ %>
                                  <form action="/admin/crash/<%= producto.id%>?_method=DELETE" method="post">
                                    <button type="submit" id="eliminar-producto" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                                  </form>
                                <% } %>
                            </div>
                        </td>
                      
                      </tr>
                <% }) %>

*/