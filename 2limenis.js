const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Nosauc doto valodu!',
        choice1: 'Python',
        choice2: 'RavenDB',
        choice3: 'Stata',
        choice4: 'XSL',
        answer: 1,
    },
    {
        question: 'Nosauc doto valodu!',
        choice1: 'Java',
        choice2: 'CVS',
        choice3: 'DOM',
        choice4: 'MantisBT',
        answer: 1,
    },
    {
        question: 'Nosauc doto valodu!',
        choice1: 'RegEx',
        choice2: 'Go!',
        choice3: 'URL',
        choice4: 'PL/SQL',
        answer: 2,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 3

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('starp2.html')
    }

    questionCounter++
    progressText.innerText = `Jautājums ${questionCounter} no ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

var img = document.createElement("img");

img.src = "valodas/html.jpeg";
var src = document.getElementById("x");

src.appendChild(img);

startGame()