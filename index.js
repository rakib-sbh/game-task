const level = document.getElementById("level");
const attempt = document.getElementById("attempt");
const remainingAttempt = document.getElementById("remain-attempt");
const totalScore = document.getElementById("total-score");
const goal = document.getElementById("goal");
const playBtn = document.getElementById("playBtn");
const currentScore = document.getElementById("current-score");
const scoreBoard = document.getElementById("scoreBoard");
const message = document.getElementById("message");

const generateRandom = (upper) => {
  return Math.floor(Math.random() * upper) + 1;
};

let goalValue = generateRandom(50);
let levelValue = 1;
let attemptValue = 0;
let scoreValue = 0;
let scoreArray = [];
let maxAttempt = generateRandom(15);
let win = false;
let loose = false;
let gameState = "started";
let number;

const displayBoard = (text) => {
  message.innerText = text;
};

const printScoreBoard = (scoreArray) => {
  scoreArray.forEach((ele) => {
    if (ele.done == false) {
      const node = document.createElement("div");
      node.classList.add("box");

      scoreBoard.appendChild(node);
      ele.done = true;
    }
  });
};

const setText = (element, value) => {
  element.innerText = element.innerText.split(": ")[0] + ": " + value;
};

const generateAndPrintScoreArray = (scoreArray) => {
  const newArray = Array.from({ length: number }, () => ({
    value: 1,
    done: false,
  }));
  scoreArray = scoreArray.concat(newArray);
  printScoreBoard(scoreArray);
};

const reset = () => {
  scoreValue = 0;
  number = 0;
  attemptValue = 0;
  maxAttempt = generateRandom(15);
  goalValue = generateRandom(50);
  gameState = "loose";
  scoreBoard.innerHTML = "";
  playBtn.textContent = "Play";
};

const common = () => {
  setText(goal, goalValue);
  setText(level, levelValue);
  setText(attempt, attemptValue);
};

const display = () => {
  common();
  setText(currentScore, number);
};

const gameStart = () => {
  common();
  setText(remainingAttempt, maxAttempt);
  setText(totalScore, scoreValue);
  displayBoard("Game Started");
};

gameStart();

playBtn.onclick = () => {
  number = generateRandom(5);
  attemptValue++;

  if (win) {
    reset();
    win = false;
  }

  if (loose) {
    reset();
    loose = false;
  }

  if (gameState == "started") {
    displayBoard("Game Going");
  } else {
    displayBoard("Game Started");
    gameState = "started";
  }
  let leftAttempt = maxAttempt - attemptValue;

  display();

  if (scoreValue + number <= goalValue && leftAttempt >= 0) {
    if (scoreValue + number === goalValue) {
      levelValue++;
      win = true;
      scoreValue += number;
      displayBoard("You won the game");
      generateAndPrintScoreArray(scoreArray);
      playBtn.textContent = "Start Next Level";
    } else {
      scoreValue += number;
      generateAndPrintScoreArray(scoreArray);
    }
  }

  if (leftAttempt == 0) {
    levelValue = 1;
    loose = true;
    displayBoard("You loose the game");
    playBtn.textContent = "Replay";
  }
  setText(remainingAttempt, leftAttempt);
  setText(totalScore, scoreValue);
};
