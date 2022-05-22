function printHighscores() {

    var highscores = JSON.parse(localStorage.getItem("highscores"));

    // for each score
    for (var i = 0; i < highscores.length; i++) {
        // List for High Scores
        var scoreLi = document.createElement("li");
        scoreLi.textContent = highscores[i].initials + ": " + highscores[i].highscore;
        document.getElementById("highscores").appendChild(scoreLi);
    }
}

function clearHighscores() {
    // Saves to Local Storage
    localStorage.removeItem("highscores");
    location.reload();
}

var resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function () {
    clearHighscores();
})
// Prints Scores 
printHighscores();