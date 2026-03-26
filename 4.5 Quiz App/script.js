const quizData = [
  {
    question: "Which language is used to style web pages?",
    answers: ["HTML", "CSS", "Python", "SQL"],
    correct: "CSS",
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    answers: [
      "querySelectorAll()",
      "getElementById()",
      "getElementsByClass()",
      "innerHTML()",
    ],
    correct: "getElementById()",
  },
  {
    question: "What does API stand for?",
    answers: [
      "Application Programming Interface",
      "Advanced Program Integration",
      "Applied Programming Internet",
      "Automatic Page Interaction",
    ],
    correct: "Application Programming Interface",
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    answers: ["let", "var", "const", "static"],
    correct: "const",
  },
  {
    question: "Which company created GitHub?",
    answers: ["Google", "Microsoft", "Apple", "Amazon"],
    correct: "Microsoft",
  },
];

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");
const nextBtn = document.getElementById("nextBtn");
const message = document.getElementById("message");

const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");
const scoreMessage = document.getElementById("scoreMessage");
const restartBtn = document.getElementById("restartBtn");

let currentQuestionIndex = 0;
let selectedAnswer = "";
let score = 0;

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";
  message.textContent = "";
  selectedAnswer = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => {
      document.querySelectorAll(".answer-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");
      selectedAnswer = answer;
      message.textContent = "";
    });

    answersContainer.appendChild(button);
  });

  if (currentQuestionIndex === quizData.length - 1) {
    nextBtn.textContent = "Finish Quiz";
  } else {
    nextBtn.textContent = "Next Question";
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.textContent = `${score} / ${quizData.length}`;

  if (score === quizData.length) {
    scoreMessage.textContent = "Excellent! You got everything correct.";
  } else if (score >= 3) {
    scoreMessage.textContent = "Great job! You did really well.";
  } else {
    scoreMessage.textContent = "Good try! Keep practicing and try again.";
  }
}

nextBtn.addEventListener("click", () => {
  if (selectedAnswer === "") {
    message.textContent = "Please select an answer before continuing.";
    return;
  }

  if (selectedAnswer === quizData[currentQuestionIndex].correct) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  selectedAnswer = "";
  score = 0;

  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion();
});

loadQuestion();
