const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1;
let board = [];


function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH - 1 }));
  }
}

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.appendChild(headCell);
  }

  htmlBoard.append(top);
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${x}-${y}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
}

function placeInTable(x, y) {
  const gamePiece = document.createElement("div");
  gamePiece.classList.add('piece');
  gamePiece.classList.add(`Player${currPlayer}`);

  const spot = `${x}-${y}`;
  const spotOnBoard = document.getElementById(spot);
  spotOnBoard.append(gamePiece);
}

function endGame(msg) {
  alert(msg);
}

function handleClick(evt) {
  const x = parseInt(evt.target.id);
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;
  placeInTable(x, y);

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);

  }

  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  currPlayer = currPlayer === 1 ? 2 : 1;
}


function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
