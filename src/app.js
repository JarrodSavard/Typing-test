// constants
var wordListContainer = document.querySelector(".word-list-container");
var wordList = document.querySelector(".word-list");
var userInput = document.querySelector(".word-input");
var resetButton = document.querySelector(".reset-button");
var correctCount = document.querySelector(".correct-words-count");
var incorrectCount = document.querySelector(".incorrect-words-count");
var timeLeft = document.querySelector(".time-left");
var wpmCount = document.querySelector(".wpm-count");
var data = fetch("https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt")
    .then(function (response) { return response.text(); })
    .then(function (data) {
    var words = data.split(/\n/);
    for (var i = 0; i < SHOWN_WORDS; i++) {
        var randomNumber = Math.floor(Math.random() * words.length);
        wordList.innerHTML += "<li>" + words[randomNumber] + "</li>";
        WORD_INDEX_CHECK_LIST.push(randomNumber + 1);
    }
})["catch"](function (err) { return console.log(err); });
// space bar event listener
var completeWord = null;
var wordIndex = 0;
var userInputFocusListener = function () {
    userInput.addEventListener("focus", function (e) {
        if (wordIndex === 0) {
            wordList[wordIndex].classList.add("liActive");
        }
    });
};
var spaceBarEventListener = function () {
    userInput.addEventListener("keyup", function (e) {
        if (e.code === "Space") {
            wordIndex++;
            userInput.value = "";
            correctCount.textContent = correctUserInput.size.toString();
            wpmCount.textContent = correctUserInput.size.toString();
            wordList.childNodes[wordIndex].classList.add("liActive");
            if (wordIndex >= 1 &&
                wordList.childNodes[wordIndex - 1].classList.contains("liActive")) {
                wordList.childNodes[wordIndex - 1].classList.remove("liActive");
            }
            else if (wordIndex >= 1 &&
                wordList.childNodes[wordIndex + 1].classList.contains("liActive")) {
                wordList.childNodes[wordIndex + 1].classList.remove("liActive");
            }
        }
    });
    // adding value to completeWord variable
    userInput.addEventListener("keydown", function (e) {
        e.code !== "Space"
            ? (completeWord = completeWord)
            : (completeWord = userInput.value);
    });
};
// check to see if user input matches given word
var correctUserInput = new Set();
var wrongWordInputs = 0;
var checkIfWordMatches = function () {
    userInput.addEventListener("keydown", function (e) {
        var word = wordList.childNodes[wordIndex].textContent;
        var userValue = userInput.value;
        if (word === userValue) {
            correctUserInput.add(userValue);
        }
        // adds color styling to words after spaceBar is pressed
        if (word !== userValue && e.code === "Space") {
            wordList.childNodes[wordIndex].style.color = "red";
            wrongWordInputs++;
            incorrectCount.textContent = wrongWordInputs.toString();
            return;
        }
        else if (word === userValue && e.code === "Space") {
            wordList.childNodes[wordIndex].style.color = "green";
            return;
        }
    });
};
// reset button
var resetPageOnClick = function () {
    resetButton.addEventListener("click", function () {
        location.reload();
    });
};
// testing if index's of 'words' and 'randomNumber' pair
var SHOWN_WORDS = 125;
var WORD_INDEX_CHECK_LIST = [];
var check = function () {
    for (var i = 0; i < SHOWN_WORDS; i++) {
        wordList.childNodes[i] === WORD_INDEX_CHECK_LIST[i]
            ? console.log(true)
            : console.log(false);
    }
    // console.log(wordList.childNodes);
    // console.log(WORD_INDEX_CHECK_LIST);
};
// timer
var time = 60;
var countDown = function () {
    time--;
    timeLeft.innerHTML = time.toString();
    if (time <= 0) {
        time = 1;
        userInput.style.display = "none";
        userInput.value = "";
        resetButton.style.display = "block";
        wordListContainer.innerHTML = "\n    <p class=\"test-end-head\">Test finished<p>\n    <p class=\"test-end-text\">Press the button to reset the test</p>\n    <p class=\"test-end-show\">Your scored " + correctUserInput.size + " WPM</p>\n    <p class=\"test-end-show\">You made " + wrongWordInputs + " errors</p>\n    ";
    }
};
var setTime = function () {
    setInterval(countDown, 1000);
};
var timerStartListener = function () {
    userInput.addEventListener("keydown", setTime);
};
var timerStopListener = function () {
    userInput.addEventListener("keydown", function () {
        userInput.removeEventListener("keydown", setTime);
    });
};
var events = function () {
    userInputFocusListener();
    spaceBarEventListener();
    checkIfWordMatches();
    timerStartListener();
    timerStopListener();
    resetPageOnClick();
    //check();
};
events();
