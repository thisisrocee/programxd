const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const questionImage = document.querySelector('#question-image');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Nosauc doto valodu!',
        choice1: 'Go!',
        choice2: 'HTML',
        choice3: 'Java',
        choice4: 'C#',
        answer: 2,
        img: 'valodas/html.jpeg',
    },
    {
        question: 'Nosauc doto valodu!',
        choice1: 'JavaScript',
        choice2: 'COBOL',
        choice3: 'PHP',
        choice4: 'PostScript',
        answer: 1,
        img: 'valodas/javascript.png',
    },
    {
        question: 'Nosauc doto valodu!',
        choice1: 'jQuery',
        choice2: 'Swift',
        choice3: 'PROLOG',
        choice4: 'C',
        answer: 4,
        img: 'valodas/C.png',
        
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

        return window.location.assign('starp1.html')
    }

    questionCounter++
    progressText.innerText = `Jautājums ${questionCounter} no ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    questionImage.src = currentQuestion.img
    question.innerText = currentQuestion.question

    if (currentQuestion.img) {
        questionImage.src = currentQuestion.img
        questionImage.style.display = 'block'
    } else {
        questionImage.src = ''
        questionImage.style.display = 'none'
    }

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

startGame()
