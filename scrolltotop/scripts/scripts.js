const scrollButton = document.querySelector('.scrollToTopButton');
scrollButton.addEventListener('click', e => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})