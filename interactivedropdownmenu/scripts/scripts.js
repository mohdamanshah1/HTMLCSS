var selection = document.querySelector('.selection');

var optionList = document.querySelectorAll('.optionList li');


const dropdown = document.querySelector('.dropdownContainer');
const dropdownMenu = document.querySelector('.optionList');

dropdown.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
});

dropdown.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
});

Array.from(optionList).forEach(op => {
    op.addEventListener('click', e => {
        selection.innerText = e.target.innerText;
        dropdownMenu.style.display = 'none';
    })
});