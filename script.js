const questions = [
  {
    question: "Javascript is an ________ languge ?",
    answer: [
      { text: "Object-Oriented", correct: true },
      { text: "Object-Based", correct: false },
      { text: "Precedural", correct: false },
      { text: "None of the above", correct: false },
    ],
  },

  {
    question:
      "Which is the following keyword is used to define a variable in Javascript",
    answer: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "Both A and B", correct: true },
      { text: "None of the above", correct: false },
    ],
  },

  {
    question:
      "Which is the following methods is used to access HTML elements using Javascript?",
    answer: [
      { text: "getElementById()", correct: false },
      { text: "getElementsByClassName()", correct: false },
      { text: "Both A and B", correct: true },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Upon encountering empty statements, what does the Javascript Interpreter do?",
    answer: [
      { text: "Throws an error", correct: false },
      { text: "Ignore the statement", correct: true },
      { text: "Given a warning", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    answer: [
      { text: "document.write()", correct: false },
      { text: "console.log()", correct: false },
      { text: "window.alert()", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
];
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of the ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
