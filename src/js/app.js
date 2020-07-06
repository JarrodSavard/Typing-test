// constants
const wordListContainer = document.querySelector(".word-list-container");
const wordList = document.querySelector(".word-list");
const userInput = document.querySelector(".word-input");
const resetButton = document.querySelector(".reset-button");
const correctCount = document.querySelector(".correct-words-count");
const incorrectCount = document.querySelector(".incorrect-words-count");
const timeLeft = document.querySelector(".time-left");
const wpmCount = document.querySelector(".wpm-count");

const data = fetch(
  "https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt"
)
  .then((response) => response.text())
  .then((data) => {
    const words = data.split(/\n/);
    for (let i = 0; i < SHOWN_WORDS; i++) {
      const randomNumber = Math.floor(Math.random() * words.length);
      wordList.innerHTML += `<li>${words[randomNumber]}</li>`;
      WORD_INDEX_CHECK_LIST.push(randomNumber + 1);
    }
  })
  .catch((err) => console.log(err));

// space bar event listener
let completeWord = null;
let wordIndex = 0;

const spaceBarEventListener = () => {
  userInput.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      wordIndex++;
      userInput.value = "";
      correctCount.textContent = correctUserInput.size;
      wpmCount.textContent = correctUserInput.size;
      wordList.childNodes[wordIndex].classList.add("liActive");
      if (
        wordIndex >= 1 &&
        wordList.childNodes[wordIndex - 1].classList.contains("liActive")
      ) {
        wordList.childNodes[wordIndex - 1].classList.remove("liActive");
      } else if (
        wordIndex >= 1 &&
        wordList.childNodes[wordIndex + 1].classList.contains("liActive")
      ) {
        wordList.childNodes[wordIndex + 1].classList.remove("liActive");
      }
    }
  });

  // adding value to completeWord variable
  userInput.addEventListener("keydown", (e) => {
    e.code !== "Space"
      ? (completeWord = completeWord)
      : (completeWord = userInput.value);
  });
};

// check to see if user input matches given word
const correctUserInput = new Set();
let wrongWordInputs = 0;

const checkIfWordMatches = () => {
  userInput.addEventListener("keydown", (e) => {
    const word = wordList.childNodes[wordIndex].textContent;
    const userValue = userInput.value;
    if (word === userValue) {
      correctUserInput.add(userValue);
      console.log(correctUserInput);
    }
    // adds color styling to words after spaceBar is pressed
    if (word !== userValue && e.code === "Space") {
      wordList.childNodes[wordIndex].style.color = "red";
      wrongWordInputs++;
      incorrectCount.textContent = wrongWordInputs;
      return;
    } else if (word === userValue && e.code === "Space") {
      wordList.childNodes[wordIndex].style.color = "green";
      return;
    }
  });
};

// reset button

const resetPageOnClick = () => {
  resetButton.addEventListener("click", () => {
    location.reload();
  });
};

// testing if index's of 'words' and 'randomNumber' pair
const SHOWN_WORDS = 125;
const WORD_INDEX_CHECK_LIST = [];

const check = () => {
  for (let i = 0; i < SHOWN_WORDS; i++) {
    wordList.childNodes[i] === WORD_INDEX_CHECK_LIST[i]
      ? console.log(true)
      : console.log(false);
  }
  // console.log(wordList.childNodes);
  // console.log(WORD_INDEX_CHECK_LIST);
};

// timer
let time = 60;
const countDown = () => {
  time--;
  timeLeft.innerHTML = time;

  if (time <= 0) {
    time = 1;
    userInput.style.display = "none";
    userInput.value = "";
    resetButton.style.display = "block";
    wordListContainer.innerHTML = `
    <p class="test-end-head">Test finished<p>
    <p class="test-end-text">Press the button to reset the test</p>
    `;
  }
};
const setTime = (e) => {
  setInterval(countDown, 10);
};
const timerStartListener = () => {
  userInput.addEventListener("keydown", setTime);
};
const timerStopListener = () => {
  userInput.addEventListener("keyup", () => {
    userInput.removeEventListener("keydown", setTime);
  });
};

const events = () => {
  spaceBarEventListener();
  checkIfWordMatches();
  timerStartListener();
  timerStopListener();
  resetPageOnClick();
  //check();
};
events();
