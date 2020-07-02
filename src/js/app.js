// constants
const wordListContainer = document.querySelector(".word-list-container");
const wordList = document.querySelector(".word-list");
const userInput = document.querySelector(".word-input");
const correctCount = document.querySelector(".correct-words-count");
const incorrectCount = document.querySelector(".incorrect-words-count");
const timeLeft = document.querySelector(".time-left");

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
    if (e.code === "Space") {
      wordIndex++;
      userInput.value = "";
      wordList.childNodes[wordIndex].classList.add("liActive");
    }
    if (wordList.childNodes[wordIndex].classList.contains("liActive")) {
      wordList.childNodes[wordIndex].classList.remove("liActive");
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
const checkIfWordMatches = () => {
  userInput.addEventListener("keyup", () => {
    let count = 0;
    let word = [wordList.childNodes[count].textContent].toString().split("");
    let user = userInput.value.split("");
    if (word !== user) {
      console.log(word);
      console.log(user);
      count++;
    } else {
    }
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
  console.log(wordList.childNodes);
  console.log(WORD_INDEX_CHECK_LIST);
};

// timer
let time = 120;
const countDown = () => {
  time--;
  timeLeft.innerHTML = time;

  if (time <= 0) {
    time = 1;
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
