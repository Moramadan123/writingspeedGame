const words = ["Hello", "code", "Html"];

// Setting levels
const lvls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 2
};

// Catch selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let selectBox = document.getElementById("mySelect");

// Set initial game values
let defaultLevelName = selectBox.value;
let defaultLevelSeconds = lvls[defaultLevelName];

// Set level name and seconds
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable paste
input.onpaste = function () {
    return false;
};

// Listen for changes in the select box and update the level
selectBox.addEventListener('change', function () {
    defaultLevelName = selectBox.value;
    defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
});

// Start the game
startButton.onclick = function () {
    this.remove();
    input.focus();
    generateWords();
};

// Generate random word and display it
function generateWords() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex, 1);
    theWord.innerHTML = randomWord;
    upcomingWords.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    
    startPlay();
}

// Start the play function with a timer
function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;

        if (timeLeftSpan.innerHTML == "0") {
            clearInterval(start);

            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = "";
                scoreGot.innerHTML++;

                if (words.length > 0) {
                    generateWords();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("Congratulations!");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                }
            } else {
                let span = document.createElement("span");
                span.classList = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}
