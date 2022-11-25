window.addEventListener('load', () => {

    let $ = (elemento) => document.querySelector(elemento)
    console.log("eyePass vinculado correctamente");

    let inputPass = $('#pass')
    let inputPass2 = $('#pass2')
    let eye = $('#eye-pass')
    let eye2 = $('#eye-pass2')

    eye.addEventListener('click', (e) => {
        inputPass.type === 'password' ? inputPass.type = 'text' : inputPass.type = 'password'
        if (eye.classList.contains('fa-eye-slash')) {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        } else {
            eye.classList.toggle('fa-eye-slash')
            eye.classList.toggle('fa-eye')
        }
    })
    if (eye2) {
        eye2.addEventListener('click', (e) => {
            inputPass2.type === 'password' ? inputPass2.type = 'text' : inputPass2.type = 'password'
            if (eye2.classList.contains('fa-eye-slash')) {
                eye2.classList.toggle('fa-eye-slash')
                eye2.classList.toggle('fa-eye')
            } else {
                eye2.classList.toggle('fa-eye-slash')
                eye2.classList.toggle('fa-eye')
            }
        })
    }
})

