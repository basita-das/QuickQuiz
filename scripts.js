const questions = [
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "A)Au", correct: true },
            { text: "B)Ag", correct: false },
            { text: "C)Fe", correct: false },
            { text: "D)Hg", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "A)Sahara", correct: false },
            { text: "B)Antarctic Desert", correct: true},
            { text: "C)Gobi Desert", correct: false },
            { text: "D)Arabian Desert", correct: false },
        ]
    },
    {
        question: " Who was the first President of the United States?",
        answers: [
            { text: "A) Abraham Lincoln", correct: false },
            { text: "B) Thomas Jefferson", correct: false },
            { text: "C) George Washington", correct: true },
            { text: "D) John Adams", correct: false },
        ]
    },
    {
        question: " What does HTML stand for?",
        answers: [
            { text: "A) HyperText Markup Language", correct: true },
            { text: "B) High-Level Machine Learning", correct: false },
            { text: "C) Hyper Transfer Meta Link", correct: false },
            { text: "D) HyperTech Machine Language", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answersBtn = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currQI = 0;
let score = 0;

function startQuiz() {
    currQI = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currQI];
    const questionNo = currQI + 1;

    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answersBtn.firstChild) {
        answersBtn.removeChild(answersBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answersBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    if(score===4){
        questionElement.innerHTML="YOU ANSWERED ALL THE QUESTIONS CORRECTLY"
        nextButton.style.display="none";
    }else{
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "TRY AGAIN";
        nextButton.style.display = "block";
    }
    
    
    
}

function handleNextButton() {
    currQI++;
    if (currQI < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currQI < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
