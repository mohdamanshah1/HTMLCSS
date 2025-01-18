const modalButton = document.querySelector('.btnToggler');
const modalYesButton = document.querySelector('.modalYes')
const modalNoButton = document.querySelector('.modalNo')
const modalWrapper = document.querySelector('.modalWrapper');
const modal = document.querySelector('.modal')

modalButton.addEventListener('click', e => {
    changeVisibility();
});

modalWrapper.addEventListener('click', e => {
    console.log("wrapper ")
    changeVisibility();
});

modalYesButton.addEventListener('click', e => {
    e.stopImmediatePropagation();
    changeVisibility();
});

modalNoButton.addEventListener('click', e => {
    e.stopImmediatePropagation();
    changeVisibility();
});

modal.addEventListener('click', e => {
    e.stopImmediatePropagation();
});

function changeVisibility() {
    modalWrapper.classList.toggle('visible');
}