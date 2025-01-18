const ligthHouseWrapper = document.querySelector('.lightHouseWrapper');
const backDrop = document.querySelector('.backDrop');
const lightHouseImage = document.querySelector('.lightHouseImage');
const imageList = document.querySelectorAll('.imageWrapper');


imageList.forEach(image => {
    image.addEventListener('click', e => {
        changeVisibility(image.firstElementChild.currentSrc);
    })
});

backDrop.addEventListener('click', e => {
    changeVisibility("");
});

lightHouseImage.addEventListener('click', e => {
    e.stopImmediatePropagation();
});

function changeVisibility(image) {
    lightHouseImage.firstElementChild.src = image;
    ligthHouseWrapper.classList.toggle('visible');
}