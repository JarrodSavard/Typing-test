const wordListContainer = document.querySelector(".word-list-container");
const wordList = document.querySelector(".word-list");
const userInput = document.querySelector(".word-input");
const correctCount = document.querySelector(".correct-words-count");
const incorrectCount = document.querySelector(".incorrect-words-count");
const timeLeft = document.querySelector(".time-left");

//Document constants

const SHOWN_WORDS = 50;
let WORD_INDEX_CHECK_LIST = [];

fetch("src/js/words.txt")
  .then((response) => response.text())
  .then((data) => {
    const words = data.split(/\n/);
    for (let i = 0; i < SHOWN_WORDS; i++) {
      const randomNumber = Math.floor(Math.random() * words.length + 1);
      wordList.innerHTML += `<li>${words[randomNumber]}</li>`;
      WORD_INDEX_CHECK_LIST.push(randomNumber);
    }
    console.log(WORD_INDEX_CHECK_LIST);
  });
