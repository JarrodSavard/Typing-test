//Document constants
const wordListContainer = document.querySelector(".word-list-container");
const wordList = document.querySelector(".word-list");
const userInput = document.querySelector(".word-input");
const correctCount = document.querySelector(".correct-words-count");
const incorrectCount = document.querySelector(".incorrect-words-count");
const timeLeft = document.querySelector(".time-left");

//space bar event listener
userInput.addEventListener("keyup", (e) => {
  e.code === "Space" ? (userInput.value = "") : console.log(userInput.value);
});

//fetching list and creating a index pair of 'words' and 'randomNumber'
const SHOWN_WORDS = 50;
let WORD_INDEX_CHECK_LIST = [];

fetch("src/js/words.txt")
  .then((response) => response.text())
  .then((data) => {
    const words = data.split(/\n/);
    for (let i = 0; i < SHOWN_WORDS; i++) {
      const randomNumber = Math.floor(Math.random() * words.length);
      wordList.innerHTML += `<li>${words[randomNumber]}</li>`;
      WORD_INDEX_CHECK_LIST.push(randomNumber + 1);
    }
    console.log(wordList.childNodes[0]);
    console.log(WORD_INDEX_CHECK_LIST[0]);
  });

const check = () => {
  for (let i = 0; i < SHOWN_WORDS; i++) {
    if (wordList.childNodes[i] === WORD_INDEX_CHECK_LIST[i]) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
  console.log(wordList.childNodes, WORD_INDEX_CHECK_LIST);
};

check();
