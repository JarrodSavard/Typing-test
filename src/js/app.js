// constants
const wordListContainer = document.querySelector(".word-list-container");
const wordList = document.querySelector(".word-list");
const userInput = document.querySelector(".word-input");
const correctCount = document.querySelector(".correct-words-count");
const incorrectCount = document.querySelector(".incorrect-words-count");
const timeLeft = document.querySelector(".time-left");
const wpmCount = document.querySelector(".wpm-count");

fetch(
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
    if (e.code === "Backspace" && wordIndex === 0) {
      return;
    }
    if (e.code === "Space") {
      wordIndex++;
      userInput.value = "";
      correctCount.textContent = `${correctUserInput.size}`;
      wpmCount.textContent = `${(correctUserInput.size / 2).toFixed(2)}`;
      wordList.childNodes[wordIndex].classList.add("liActive");
      if (
        wordIndex >= 1 &&
        wordList.childNodes[wordIndex - 1].classList.contains("liActive")
      ) {
        wordList.childNodes[wordIndex - 1].classList.remove("liActive");
      }
    } else if (e.code === "Backspace" && userInput.value === "") {
      wordIndex--;
      userInput.value = "";
      wordList.childNodes[wordIndex].classList.add("liActive");
      if (
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
// ----------------
// Need to make matches append to a array and to show wpm
// ----------------
const correctUserInput = new Set();
let wrongWordInputs = 0;

const checkIfWordMatches = () => {
  userInput.addEventListener("keyup", () => {
    const word = wordList.childNodes[wordIndex].textContent;
    const userValue = userInput.value;
    console.log(userValue);
    console.log(word);
    if (word === userValue) {
      correctUserInput.add(userValue);
    }
    return;
  });
  userInput.addEventListener("keydown", (e) => {
    const word = wordList.childNodes[wordIndex].textContent;
    const userValue = userInput.value;
    if (word != userValue && e.code === "Space") {
      wrongWordInputs++;
      incorrectCount.textContent = wrongWordInputs;
    }
    return;
  });
};

// testing if index pair of 'words' and 'randomNumber'
const SHOWN_WORDS = 50;
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
let time = 120;
const countDown = () => {
  time--;
  timeLeft.innerHTML = time;

  if (time <= 0) {
    time = 1;
    userInput.value = `Test Finished`;
  }
};
const setTime = (e) => {
  setInterval(countDown, 1000);
};
const timerStartListener = () => {
  userInput.addEventListener("keydown", setTime);
};
const timerStopListener = () => {
  userInput.addEventListener("keyup", () => {
    userInput.removeEventListener("keydown", setTime);
  });
};

//userInput.removeEventListener('keydown', )

const events = () => {
  spaceBarEventListener();
  checkIfWordMatches();
  timerStartListener();
  timerStopListener();
  //check();
};
events();
