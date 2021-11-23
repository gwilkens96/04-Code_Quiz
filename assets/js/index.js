let questionArray = 0;
let time = questions.length * 20;
let timerId;

const questionsEl = document.getElementById("questions");
const timerEl = document.getElementById("timer");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start");
const initialsEl = document.getElementById("initials");
const feedbackEl = document.getElementById("feedback");

function startQuiz() {
  let startScreenEl = document.getElementById("start");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  displayQuestions();
}

function displayQuestions() {
  let currentQuestion = questions[questionArray];

  let titleEL = document.getElementById("titleQ");
  titleEL.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    let choiceSelector = document.createElement("button");
    choiceSelector.setAttribute("class", "choice");
    choiceSelector.setAttribute("value", choice);

    choiceSelector.textContent = i + 1 + ". " + choice;

    choiceSelector.onclick = questionClick;

    choicesEl.appendChild(choiceSelector);
  });
}

function questionClick() {
  if (this.value !== questions[questionArray].answer) {
    time -= 20;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    feedbackEl.textContent = "No!";
  } else {
    feedbackEl.textContent = "Yes!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  questionArray++;

  if (questionArray === questions.length) {
    quizEnd();
  } else {
    displayQuestions();
  }
}

function quizEnd() {
  clearInterval(timerId);

  let endScreenEl = document.getElementById("endQuiz");
  endScreenEl.removeAttribute("class");

  let finalScoreEl = document.getElementById("finalScore");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  let initials = initialsEl.value.trim();

  if (initials !== "") {
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    let newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "scoreboard.html";
  }
}

submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;
