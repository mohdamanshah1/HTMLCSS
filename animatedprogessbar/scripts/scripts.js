const imageContainer = document.querySelector('.container');
const progressBar = document.querySelector('.progress');
console.log(progressBar)
appendImage();
function createImageNode(index) {

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "imageWrapper";
    const img = document.createElement("img");
    img.src = `https://picsum.photos/1000?random=${index}`;
    img.alt = "notfound";
    imageWrapper.appendChild(img);
    return imageWrapper;
}

window.onscroll = function () {
    let percentage = (Math.ceil(window.scrollY));
    percentage /= document.body.offsetHeight;
    percentage *= 100;
    progressBar.style.width = `${Math.floor(percentage)}%`;
    if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight) {
        appendImage();
    }
}

function appendImage() {
    for (let i = 0; i < 20; i++) {
        let type = Math.floor(5 * Math.random());
        imageContainer.appendChild(createImageNode(i));
    }
}


