const playButton = document.querySelector('.controls button');
const video = document.querySelector('video');
const volume = document.querySelector('.volumeSlider');
const progress = document.querySelector('.progressBar');



playButton.addEventListener('click', e => {
    playButton.classList.toggle('pause');
    playButton.classList.toggle('play');
    if (video.paused || video.ended) {
        video.play();
    }
    else {
        video.pause();
    }
})


video.addEventListener('timeupdate', e => {
    progress.value = (video.currentTime / video.duration) * 100;
})

progress.addEventListener('input', e => {
    video.currentTime = (progress.value / 100) * video.duration;
})

volume.addEventListener('input', e => {
    video.volume = volume.value;
})