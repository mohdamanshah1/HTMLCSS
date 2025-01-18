const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let moveAmount = 50;

function speak(text) {
    const work = document.getElementById('work');
    work.innerHTML = '';
    work.innerText = text;
}

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function moveDiv(direction) {
    let currentLeft = parseInt(movableDiv.style.left || 0);
    let currentTop = parseInt(movableDiv.style.top || 0);

    const moveAmount = 50;

    switch (direction) {
        case 'left':
            movableDiv.style.left = currentLeft - moveAmount + 'px';
            break;
        case 'right':
            movableDiv.style.left = currentLeft + moveAmount + 'px';
            break;
        case 'up':
            movableDiv.style.top = currentTop - moveAmount + 'px';
            break;
        case 'down':
            movableDiv.style.top = currentTop + moveAmount + 'px';
            break;
    }
}

function takeCommand(message) {
    if (message.includes('left')) {
        moveDiv('left');
        speak("Moving the div to the left.");
    } else if (message.includes('right')) {
        moveDiv('right');
        speak("Moving the div to the right.");
    } else if (message.includes('up')) {
        moveDiv('up');
        speak("Moving the div up.");
    } else if (message.includes('down')) {
        moveDiv('down');
        speak("Moving the div down.");
    } else if (message.includes('increase speed')) {
        moveAmount += 20;
    }
    else if (message.includes('reduce speed')) {
        moveAmount -= 20;
    }
    else {
        speak("Sorry, I didn't understand that command.");
    }
}