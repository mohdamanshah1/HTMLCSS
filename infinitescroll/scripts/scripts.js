const imageContainer = document.querySelector('.container');
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
    console.log(window.innerHeight);
    console.log(window.scrollY);
    console.log(document.body.offsetHeight);
    if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight) {
        appendImage();
    }
}

function appendImage() {
    for (let i = 0; i < 50; i++) {
        let type = Math.floor(5 * Math.random());
        imageContainer.appendChild(createImageNode(i));
    }
}


