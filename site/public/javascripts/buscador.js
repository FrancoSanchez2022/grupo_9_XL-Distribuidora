window.addEventListener('load', () => {

    let vinculacion = 'Documento vinculado con exito'
    console.log(vinculacion);
    
    let $ = (elemento) => document.querySelector(elemento)
    let selectorAll = (elemento) => document.querySelectorAll(elemento)

    let buscador = $('#search')
    let botones = selectorAll('.botonRedireccion')
    let palabra = ""
    buscador.onkeydown = (event) => {
        let letra = event.key
        letra === 'Backspace' ? palabra = palabra.substring(0, palabra.length - 1) : letra.length > 1 ? null : palabra = palabra += letra
        if (palabra === 'Ala') {
            botones.forEach(element => {
                element.style.backgroundColor = 'var(--black)'
            });
        }
    }
    
})