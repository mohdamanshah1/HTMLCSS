const openButton = document.querySelector('.openButton');
const closeButton = document.querySelector('.closeButton')
const sideBar = document.querySelector('.sidenav');


openButton.addEventListener('click', e => {
    sideBar.classList.add('open')
    sideBar.classList.remove('close')
})
closeButton.addEventListener('click', e => {
    sideBar.classList.add('close')
    sideBar.classList.remove('add')
});
