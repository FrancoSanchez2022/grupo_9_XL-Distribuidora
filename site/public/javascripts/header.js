
const iconUser = document.querySelector('#user-btn');
const data = document.querySelector('.user-container');

iconUser.addEventListener('click', () => {
    data.classList.toggle('active');
    cart.classList.remove('active')
})
