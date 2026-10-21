
var currentPlayer = 1;

var board = ["", "", "", "", "", "", "", "", ""];

var p1Wins = 0;
var p2Wins = 0;
var draws = 0;

// is game over or not
var gameOver = false;

// all possible winning combinations
var winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// add click event to all 9 cells
for (var i = 0; i < 9; i++) {
  var cell = document.getElementById("cell-" + i);
  cell.addEventListener("click", cellClicked);
}

// highlight player 1 as active at start
document.getElementById("p1-score-box").classList.add("active");

// when a cell is clicked
function cellClicked() {
  // get which cell was clicked (0 to 8)
  var index = parseInt(this.id.split("-")[1]);

  // if cell already filled or game is over, do nothing
  if (board[index] != "" || gameOver) {
    return;
  }

  // fill the cell
  if (currentPlayer == 1) {
    board[index] = "X";
    this.textContent = "X";
    this.classList.add("p1");
  } else {
    board[index] = "O";
    this.textContent = "O";
    this.classList.add("p2");
  }

  // check if someone won
  var winResult = checkWin();

  if (winResult != null) {
    // highlight winning cells
    for (var i = 0; i < winResult.length; i++) {
      document.getElementById("cell-" + winResult[i]).classList.add("win");
    }

    document.getElementById("turn-text").textContent = "Player " + currentPlayer + " wins!";
    gameOver = true;

    // update score
    if (currentPlayer == 1) {
      p1Wins++;
      document.getElementById("p1-score").textContent = p1Wins;
    } else {
      p2Wins++;
      document.getElementById("p2-score").textContent = p2Wins;
    }

    // show next round button
    document.getElementById("next-btn").classList.add("show");
    return;
  }

  // check draw - all cells filled and no winner
  var allFilled = true;
  for (var i = 0; i < board.length; i++) {
    if (board[i] == "") {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    document.getElementById("turn-text").textContent = "It's a draw!";
    draws++;
    document.getElementById("draw-count").textContent = draws;
    gameOver = true;
    document.getElementById("next-btn").classList.add("show");
    return;
  }

  // switch player
  if (currentPlayer == 1) {
    currentPlayer = 2;
    document.getElementById("turn-text").textContent = "Player 2's turn";
    document.getElementById("p1-score-box").classList.remove("active");
    document.getElementById("p2-score-box").classList.add("active");
  } else {
    currentPlayer = 1;
    document.getElementById("turn-text").textContent = "Player 1's turn";
    document.getElementById("p2-score-box").classList.remove("active");
    document.getElementById("p1-score-box").classList.add("active");
  }
}

// check if any winning combo matches the board
function checkWin() {
  for (var i = 0; i < winCombos.length; i++) {
    var a = winCombos[i][0];
    var b = winCombos[i][1];
    var c = winCombos[i][2];

    if (board[a] != "" && board[a] == board[b] && board[b] == board[c]) {
      return winCombos[i];
    }
  }
  return null;
}

// start next round, keep scores
function nextRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 1;
  gameOver = false;

  // clear all cells
  for (var i = 0; i < 9; i++) {
    var cell = document.getElementById("cell-" + i);
    cell.textContent = "";
    cell.className = "cell";
  }

  document.getElementById("turn-text").textContent = "Player 1's turn";
  document.getElementById("next-btn").classList.remove("show");
  document.getElementById("p1-score-box").classList.add("active");
  document.getElementById("p2-score-box").classList.remove("active");
}

// reset everything including scores
function resetGame() {
  p1Wins = 0;
  p2Wins = 0;
  draws = 0;

  document.getElementById("p1-score").textContent = 0;
  document.getElementById("p2-score").textContent = 0;
  document.getElementById("draw-count").textContent = 0;

  nextRound();
}
