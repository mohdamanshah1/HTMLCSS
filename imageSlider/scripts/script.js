let currentIndex = 0;
const sliderImage = document.getElementById('sliderImage');
// Initialize with the first image
changeSlide(1)

function changeSlide(direction) {

  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = 500;
  }
  else if (currentIndex > 500) {
    currentIndex = 1
  }
  sliderImage.src = `https://picsum.photos/1000?random=${currentIndex + 1}`;
}


