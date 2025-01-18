const imageContainer = document.querySelector('.container');
const filterOptions = document.querySelectorAll('.filterOptions input[type=checkbox]');


const images = [];
let imageToDisplay = [];
let selectedTypes = [1, 2, 3, 4, 5];

const types = [1, 2, 3, 4, 5]

for (let i = 0; i < 100; i++) {

    let type = Math.floor(5 * Math.random());
    images.push({
        image: createImageNode(i),
        type: types[type]
    });
}

filter();
function createImageNode(index) {

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "imageWrapper";

    const img = document.createElement("img");
    img.src = `https://picsum.photos/1000?random=${index}`;
    img.alt = "notfound";
    imageWrapper.appendChild(img);

    return imageWrapper;
}

function filter() {

    imageToDisplay = images.filter(image => {
        return selectedTypes.includes(image.type)
    });
    imageContainer.innerHTML = '';
    imageToDisplay.forEach(image => {
        imageContainer.appendChild(image.image);
    });
}

Array.from(filterOptions).forEach(option => {
    option.addEventListener('change', e => {

        selectedTypes = Array.from(filterOptions)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => parseInt(checkbox.value));
        filter();
    });
});

