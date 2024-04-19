const goal = document.getElementById("goal");
const level = document.getElementById("level");
const attempt = document.getElementById("attempt");
const remainingAttempt = document.getElementById("remain-attempt");
const score = document.getElementById("score");
const goalBtn = document.getElementById("goalBtn");
const scoreBtn = document.getElementById("scoreBtn");
const goalInp = document.getElementById("goalInp");
const scoreInp = document.getElementById("scoreInp");
const scoreBoard = document.getElementById("scoreBoard");
const message = document.getElementById("message");

let goalValue;
let levelValue;
let attemptValue;
let scoreValue;
let scoreArray;
let clicked;
let maxAttempt;
let firstTime = true;

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

const setValue = (element, value) => {
  element.value = value;
};

const generateRandom = (upper) => {
  return Math.floor(Math.random() * upper) + 1;
};

const gameChange = () => {
  setTimeout(() => {
    startGame();
    scoreBoard.innerHTML = "";
  }, 1 * 2000);
};

const reset = () => {
  goalValue = 0;
  attemptValue = 0;
  scoreValue = 0;
  scoreArray = [];
  clicked = false;
  maxAttempt = 15;
};

const startGame = () => {
  reset();
  setText(goal, goalValue);
  if (firstTime) {
    levelValue = 1;
    firstTime = false;
  } else {
    levelValue++;
  }
  setText(level, levelValue);
  setText(attempt, attemptValue);
  setText(score, scoreValue);
  setText(remainingAttempt, maxAttempt - attemptValue);
  setValue(scoreInp, 0);
  setValue(goalInp, 0);
  displayBoard("Game Started");
};

goalBtn.onclick = () => {
  if (goalValue > 0) {
    return;
  } else {
    goalValue = generateRandom(50);
    setText(goal, goalValue);
    setValue(goalInp, goalValue);
    displayBoard("Game going");
    clicked = true;
  }
};

scoreBtn.onclick = () => {
  if (!clicked) return;
  let number = generateRandom(5);
  setValue(scoreInp, number);
  attemptValue++;

  setText(remainingAttempt, maxAttempt - attemptValue);
  if (number + scoreValue <= goalValue) {
    const newArray = Array.from({ length: number }, () => ({
      value: 1,
      done: false,
    }));
    scoreArray = scoreArray.concat(newArray);
    scoreValue += number;
    setText(score, scoreValue);
  }

  if (attemptValue <= maxAttempt) {
    setText(attempt, attemptValue);
    if (goalValue == scoreValue && clicked) {
      displayBoard("You won the game !");
      gameChange();
    }
  } else {
    firstTime = true;
    displayBoard("You loose the game !");
    gameChange();
  }

  printScoreBoard(scoreArray);
};

startGame();
