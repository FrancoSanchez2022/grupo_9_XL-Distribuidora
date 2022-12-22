window.onload = () => {
    let vinculacion = 'Documento vinculado con exito'
    console.log(vinculacion);

    let $ = (elemento) => document.querySelector(elemento)

    let aumentar = $('#increase')
    let disminuir = $('#decrease')
    let input = $('#contador')
    let stock = $('#stockOculto')

    let contador = 1
    stock.style.display = 'none'
    stock = stock.value
    
    let sumar = () => {
        if(contador < stock){
            contador ++;
        }
        return input.value = contador
    }

    function restar() {
        if(contador > 1){
            contador--;
        }
        return input.value = contador
    }

    aumentar.onclick = () => {
        sumar()
    }
    disminuir.onclick = (e) => {
        restar()
    }

}