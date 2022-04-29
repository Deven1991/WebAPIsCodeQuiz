var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-btn");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("question");
var answerA = document.getElementById("btn0");
var answerB = document.getElementById("btn1");
var answerC = document.getElementById("btn2");
var answerD = document.getElementById("btn3");
var answerCheck = document.getElementById("answer-check");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submit-initial-btn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("go-back-btn");
var clearHighScoreBtn = document.getElementById("clear-high-score-btn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// Timer starts when button is clicked
var totalTime = 60;
function startBtn() {
    console.log("start");
    startDiv.style.display = "none";
    timer.style.display = "block";
    // timesUp.style.display = "none";

    var startTimer = setInterval(function () {
        totalTime--;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);

    showQuiz();
};

// List of Coding Quiz Questions
const questions = [
    {
        question: "Which method would you use to find an ID element?",
        options: ["getElementbyId()", "getElementsbyId()", "getElementbyID()", "getelementbyid()"],
        answer: "getElementbyId()"
    },
    {
        question: "To see if two variables are equal in an if/else statement, you would use ____.",
        options: ["=", "==", "equals", "!="],
        answer: "=="
    },
    {
        question: "Math.random() returns ____.",
        options: ["a number between 1 and 9", "a number between 0 and 9", "a number between 0 and 1", "a number between 0 and 99"],
        answer: "a number between 0 and 1"
    },
    {
        question: "The first index of an array is ____.",
        options: ["0", "1", "6", "None of the above"],
        answer: "0"
    },
    {
        question: "What are JavaScript's Boolean data type values?",
        options: ["Rachel and Monica", "true and false", "0 and 1", "Mike and Melissa"],
        answer: "true and false"
    }
];

// Page continues to questions
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    answerA.textContent = questions[questionIndex].options[0];
    answerB.textContent = questions[questionIndex].options[1];
    answerC.textContent = questions[questionIndex].options[2];
    answerD.textContent = questions[questionIndex].options[3];
}

// Confirms whether answer is correct or incorrect
function checkAnswer(answer) {

    // var lineBreak = document.getElementById("lineBreak");
    // lineBreak.style.display = "block";
    // answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].options[answer]) {
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Incorrect, the correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        // Game over if no additional questions
        gameOver();
    }
}

function responseA() { checkAnswer(0); }

function responseB() { checkAnswer(1); }

function responseC() { checkAnswer(2); }

function responseD() { checkAnswer(3); }

function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAns;
}

// Stores score results
function storeHighScores(event) {
    event.preventDefault();

    // stop function is initial is blank
    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    }

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // Saved High Scores in Local Storage?
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

answerA.addEventListener("click", responseA);
answerB.addEventListener("click", responseB);
answerC.addEventListener("click", responseC);
answerD.addEventListener("click", responseD);

startQuizBtn.addEventListener("click", startBtn);

submitInitialBtn.addEventListener("click", function (event) {
    storeHighScores(event);
});

goBackBtn.addEventListener("click", function () {
    highScoreSection.style.display = "none";
});

// clearHighScoreBtn.addEventListener("click", function () {
//     window.localStorage.removeItem("high scores");
//     listOfHighScores.innerHTML = "High Scores Cleared";
// });