import getQuestions from "./question.js";
let score = 0;
let questionNumber = 1;
const questions = getQuestions();
const modalYesButton = document.querySelector('.modalYes')
const modalWrapper = document.querySelector('.modalWrapper');
const resultScore = document.querySelector('.modal p');
const questionNode = document.querySelector('.question p');
const optionListNode = document.querySelectorAll('.options li');
const questionNumberNode = document.querySelector('.quesNumber');
const nextQuesButtonNode = document.querySelector('.nextQuesButton button');

loadQuestion();

nextQuesButtonNode.addEventListener('click', gotoNextQuestion);

function loadQuestion() {

    if (questionNumber == questions.length) {
        nextQuesButtonNode.innerHTML = "Submit";
        nextQuesButtonNode.removeEventListener('click', gotoNextQuestion);
        nextQuesButtonNode.addEventListener('click', handleSubmission);
    }

    questionNode.innerText = questions[questionNumber - 1].question;

    Array.from(optionListNode).forEach((option, index) => {
        option.innerText = questions[questionNumber - 1].options[index];
        option.classList.remove('correct');
        option.classList.remove('wrong');
        option.addEventListener('click', handleAnswer);
    }
    );

    questionNumberNode.innerText = `${questionNumber} of ${questions.length} questions.`;
}

function handleAnswer(e) {

    let answer = e.target.innerText;
    let actualAnwser = questions[questionNumber - 1].answer;
    let correctAnswerNode;

    Array.from(optionListNode).forEach((option) => {
        option.removeEventListener('click', handleAnswer);
        if (option.innerText == actualAnwser) {
            correctAnswerNode = option;
        }
    }
    );

    if (answer == actualAnwser) {
        e.target.classList.add('correct');
        score++;
        updateScore();
    }

    else {
        correctAnswerNode.classList.add('correct');
        e.target.classList.add('wrong');
    }
}

function gotoNextQuestion() {
    questionNumber++;
    loadQuestion();
}

function updateScore() {
    document.querySelector('.score p').innerText = `Score ${score}`;
}


function handleSubmission(e) {
    let answer = e.target.innerText;
    let actualAnwser = questions[questionNumber - 1].answer;
    if (answer == actualAnwser) {
        score++;
    }
    changeVisibility();
    resultScore.innerText = `Your Score: ${score}`;
}


modalYesButton.addEventListener('click', e => {

    questionNumber = 1;
    score = 0;
    nextQuesButtonNode.innerHTML = "Next";
    nextQuesButtonNode.addEventListener('click', gotoNextQuestion);
    nextQuesButtonNode.removeEventListener('click', handleSubmission);
    updateScore();
    changeVisibility();
    loadQuestion();
});

function changeVisibility() {
    modalWrapper.classList.toggle('visible');
}