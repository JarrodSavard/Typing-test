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
    let word = [wordList.childNodes[wordIndex].textContent]
      .toString()
      .split("");
      console.log(word)
    console.log(userInput.value.toString().split(''));   
    if (word.value != userInput.value) {
      wordList.childNodes[wordIndex].classList.add("spelt-right");
    } else {
      wordList.childNodes[wordIndex].classList.remove("spelt-right");
      wordList.childNodes[wordIndex].classList.add("spelt-wrong");
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

const events = () => {
  spaceBarEventListener();
  checkIfWordMatches();
  check();
};
events();
