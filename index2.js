const level = document.getElementById("level");
const attempt = document.getElementById("attempt");
const remainingAttempt = document.getElementById("remain-attempt");
const score = document.getElementById("score");
const goal = document.getElementById("goal");
const playBtn = document.getElementById("playBtn");
const scoreBoard = document.getElementById("scoreBoard");
const message = document.getElementById("message");

message.classList.add("demo");

let goalValue;
let levelValue = 1;
let attemptValue = 0;
let scoreValue = 0;
let scoreArray = [];
let maxAttempt = 15;
let clicked = false;
let win = false;
let loose = false;
let number;

const generateRandom = (upper) => {
  return Math.floor(Math.random() * upper) + 1;
};

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
  scoreBoard.innerHTML = "";
};

playBtn.onclick = () => {
  message.classList.add("demo");

  if (clicked) {
    number = generateRandom(5);
    attemptValue++;
    console.log("number", number);
  } else {
    goalValue = generateRandom(50);
    clicked = true;
  }

  if (win) {
    reset();
    win = false;
  }

  if (loose) {
    reset();
    loose = false;
  }
  console.log("attempt", attemptValue);
  let leftAttempt = maxAttempt - attemptValue;
  console.log("left", leftAttempt);
  setText(goal, goalValue);
  setText(level, levelValue);
  setText(attempt, attemptValue);

  if (scoreValue + number <= goalValue && leftAttempt >= 0) {
    // go to next level
    if (scoreValue + number === goalValue) {
      levelValue++;
      clicked = false;
      win = true;
      scoreValue += number;
      message.classList.remove("demo");
      displayBoard("You won the game");
      console.log("You won the game");
      generateAndPrintScoreArray(scoreArray);
    } else {
      scoreValue += number;
      generateAndPrintScoreArray(scoreArray);
    }
  }

  if (leftAttempt == 0) {
    levelValue = 1;
    clicked = false;
    loose = true;
    console.log("You loose the game");
    displayBoard("You loose the game");
    message.classList.remove("demo");
  }
  setText(remainingAttempt, leftAttempt);
  setText(score, scoreValue);

  console.log("---");
};

// const gameChange = () => {
//   setTimeout(() => {
//     startGame();
//     scoreBoard.innerHTML = "";
//   }, 1 * 2000);
// };

// const startGame = () => {
//   reset();
//   setText(goal, goalValue);
//   if (firstTime) {
//     levelValue = 1;
//     firstTime = false;
//   } else {
//     levelValue++;
//   }
//   setText(level, levelValue);
//   setText(attempt, attemptValue);
//   setText(score, scoreValue);
//   setText(remainingAttempt, maxAttempt - attemptValue);
//   setValue(scoreInp, 0);
//   setValue(goalInp, 0);
//   displayBoard("Game Started");
// };

// scoreBtn.onclick = () => {
//   if (!clicked) return;
//   let number = generateRandom(5);
//   setValue(scoreInp, number);
//   attemptValue++;

//   setText(remainingAttempt, maxAttempt - attemptValue);
//   if (number + scoreValue <= goalValue) {
//     const newArray = Array.from({ length: number }, () => ({
//       value: 1,
//       done: false,
//     }));
//     scoreArray = scoreArray.concat(newArray);
//     scoreValue += number;
//     setText(score, scoreValue);
//   }

//   if (attemptValue <= maxAttempt) {
//     setText(attempt, attemptValue);
//     if (goalValue == scoreValue && clicked) {
//       displayBoard("You won the game !");
//       gameChange();
//     }
//   } else {
//     firstTime = true;
//     displayBoard("You loose the game !");
//     gameChange();
//   }

//   printScoreBoard(scoreArray);
// };

// startGame();
