// DOM constants
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

const spaceBarEventListener = () => {
  userInput.addEventListener("keyup", (e) => {
    e.code === "Space" ? (userInput.value = "") : console.log(userInput.value);
  });

  // adding value to completeWord
  userInput.addEventListener("keydown", (e) => {
    e.code !== "Space"
      ? (completeWord = completeWord)
      : (completeWord = userInput.value);
  });
};

// check to see if user input matches given word

const checkIfWordMatches = () => {};

// fetching list and creating a index pair of 'words' and 'randomNumber'
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

const events = () => {
  spaceBarEventListener();
  check();
};
events();
