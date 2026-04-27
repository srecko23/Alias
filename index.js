import nouns from "./nc_frequencies.json" with {type: "json"};
import verbs from "./vm_frequencies.json" with {type: "json"};
import adjs from "./ag_frequencies.json" with {type: "json"};

let difficultyMin = 1140;
let difficultyMax = 5663487;
let startTime;
let time;
let startDate;
let skipPenalty;
let points = 0;

const options = document.getElementById("options");
const gameUi = document.getElementById("game-ui");
const wordDisplay = document.getElementById("word");
const pointsDisplay = document.getElementById("points_display");
const skipPenaltyDropdown = document.getElementById("penalty-dropdown");
const difficultyMinInput = document.getElementById("difficulty-min");
const difficultyMaxInput = document.getElementById("difficulty-max");
const timeInput = document.getElementById("time");
const timer = document.getElementById("timer");
const lastGame = document.getElementById("last-game");

window.startGame = () => {
    options.hidden = true;
    gameUi.hidden = false;

    skipPenalty = parseFloat(skipPenaltyDropdown.value);
    difficultyMin = parseInt(difficultyMinInput.value);
    difficultyMax = parseInt(difficultyMaxInput.value);
    startTime = parseInt(timeInput.value);
    time = startTime;
    startDate = new Date();

    nextWord();
    incrementTimer();
}

window.nextWord = () => {
    while (true) {
        let word = Object.keys(nouns)[Math.floor(Math.random() * Object.keys(nouns).length)];
        if (parseInt(nouns[word]) >= difficultyMin && parseInt(nouns[word]) <= difficultyMax) {
            wordDisplay.textContent = word;
            break;
        }
    }
}

window.displayPoints = () => {
    pointsDisplay.textContent = "bodovi:" + points.toString()
}

window.correct = () => {
    points++;
    nextWord();
    displayPoints();
}

window.wrong = () => {
    points -= skipPenalty;
    nextWord();
    displayPoints();
}

window.incrementTimer = () => {
    time = startTime - Math.floor((new Date() - startDate)/1000);
    timer.textContent = time;
    if (time == 0) {
        options.hidden = false;
        gameUi.hidden = true;
        lastGame.textContent = "zadnji game: " + points.toString() + " bodova"
    }
}
setInterval(incrementTimer, 1000);