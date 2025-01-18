document.getElementById("inputFile").addEventListener("change", uploadImage);

function uploadImage(event) {
    const image = event.target.files[0];

    if (!image) {
        return;
    }

    showToaster("Uploading image...");

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cm4xuaf4");
    data.append("cloud_name", "dujkum5gy");

    fetch("https://api.cloudinary.com/v1_1/dujkum5gy/image/upload", {
        method: "POST",
        body: data
    })
        .then(res => res.json())
        .then(data => {
            const imageUrl = data.url;
            createImageTag(imageUrl);

            hideToaster();
        })
        .catch(err => {
            console.error("Error uploading image:", err);
            hideToaster();
        });
}

function showToaster(message) {
    const toaster = document.getElementById("toaster");
    toaster.textContent = message;
    toaster.classList.add("show");
    toaster.classList.remove("hidden");
}

function hideToaster() {
    const toaster = document.getElementById("toaster");
    toaster.classList.remove("show");

    setTimeout(() => {
        toaster.classList.add("hidden");
    }, 1000);
}

function createImageTag(imageUrl) {
    const imageContainer = document.getElementById("imageContainer");
    const imgTag = document.createElement("img");
    imgTag.src = imageUrl;
    imgTag.alt = "Uploaded Image";
    imageContainer.appendChild(imgTag);
}
