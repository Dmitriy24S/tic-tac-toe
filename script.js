const winningConditions = [
  [0, 1, 2], // left-right
  [3, 4, 5], // left-right
  [6, 7, 8], // left-right
  [0, 3, 6], // up-down
  [1, 4, 7], // up-down
  [2, 5, 8], // up-down
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
];
let circleTurn = false; // X start first

const gameBoard = document.querySelector(".game-board"); // Select game board
const cellElements = document.querySelectorAll(".cell"); // Grab all game-board cells
// console.log(cellElements);
// NodeList(9) [div.cell.x, div.cell.o, div.cell, div.cell, div.cell, div.cell, div.cell, div.cell, div.cell]
// 0: div.cell.x
// 1: div.cell.o
// 2: div.cell

// Game over
const gameWinMessage = document.querySelector(".game-winning-message");
const gameWinMessageText = document.querySelector(".game-winning-message__text");
const restartButton = document.querySelector(".game-winning-message__restart-button");
function gameOver(isDraw) {
  gameWinMessage.classList.add("show"); // display game over overlay
  if (isDraw) {
    gameWinMessageText.innerText = "Draw!";
  } else {
    gameWinMessageText.innerText = `${(currentPlayerClass = circleTurn ? "O's" : "X's")} Win!`; // game over winner text
  }
}
// Restart game on restart button click
restartButton.addEventListener("click", gameStart);

// Game start (show hover mark, reset everything)
function gameStart() {
  circleTurn = false; // reset so that X start first
  gameWinMessage.classList.remove("show"); // close/hide game over message overlay
  setGameboardHoverClass(); // set cell hover design to display current player mark(x or o)
  cellElements.forEach((cell) => {
    cell.classList.remove("x"); // clear cells
    cell.classList.remove("o"); // clear cells
    cell.removeEventListener("click", handleCellClick); // reset cell clicks limit (only once click)
    cell.addEventListener("click", handleCellClick, { once: true });
  });
}
gameStart();

// Handle click on game-board cell:
// Calculate game status:
// const handleCellClick = (e) => { // ! Cannot access 'handleCellClick' before initialization
function handleCellClick(e) {
  console.log("cell clicked");
  const cell = e.target;
  const currentPlayerClass = circleTurn ? "o" : "x";
  // On cell click place current player mark (o or x):
  placeMarkOnCell(cell, currentPlayerClass);
  // Check for win:
  if (checkWin(currentPlayerClass)) {
    gameOver();
    console.log("winner");
    // If no win - Check for draw:
  } else if (checkDraw()) {
    gameOver(true); // give isDraw status = true
    console.log("draw");
    // If no winner or draw, switch turns, update hover to show new current player mark on cell hover:
  } else {
    switchTurns();
    setGameboardHoverClass(); // update current player hover class
  }
}

// Place mark on cell click:
function placeMarkOnCell(cell, currentPlayerClass) {
  cell.classList.add(currentPlayerClass);
}

// Switch turns:
function switchTurns() {
  circleTurn = !circleTurn;
}

// Set/update current player hover class, show new current player mark on cell hover
function setGameboardHoverClass() {
  gameBoard.classList.remove("x"); // clear board state active player
  gameBoard.classList.remove("o"); // clear board state active player
  gameBoard.classList.add((currentPlayerClass = circleTurn ? "o" : "x")); // update to show current player hover state mark
}

// Check for win:
function checkWin(currentPlayerClass) {
  // Reference:
  // const winningConditions = [
  //     [0, 1, 2], left-right
  //     [3, 4, 5], left-right
  //     [6, 7, 8], left-right
  //     [0, 3, 6], up-down
  //     [1, 4, 7], up-down
  //     [2, 5, 8], up-down
  //     [0, 4, 8], diagonal
  //     [2, 4, 6], diagonal
  //   ];
  return winningConditions.some((combination) => {
    return combination.every((index) => {
      // check if selected cells in triple combination contains same player class, if current player has 3 matches in 1 - they win
      return cellElements[index].classList.contains(currentPlayerClass);
    });
  });
}

// Check for draw:
function checkDraw() {
  // cellElements.every(cell => {
  return [...cellElements].every((cell) => {
    // check if every gameboard cell is filled with either "x" or "o" player mark
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}
