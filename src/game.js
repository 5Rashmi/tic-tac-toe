const tic_tac_toe = {
  board: document.getElementById("board"),
  player: ["X", "O"],
  currentPlayer: null,
  changingTxt: document.querySelector(".changing-text"),
  restartBtn: document.getElementById("restartBtn"),
  playWith: "0",

  Xpoints: [],
  Opoints: [],

  xClick: [],
  oClick: [],
  gameover: false,
  computerTurn: false,
  playerTurn: false,

  cells: Array.from(document.querySelectorAll(".cell")),

  init: function () {
    this.winning_combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    if (this.currentPlayer != this.player[1]) {
      this.currentPlayer = this.player[0];
    }
    this.changingTxt.textContent = `X's turn!`;

    if (this.playWith === "0") {
      console.log("comp by default");
      this.computerPlay();
    } else if (this.playWith === "1") {
      this.friend();
    }

    this.cells.forEach((cell) => {
      cell.addEventListener("click", () => this.handleCellClick(cell));
    });

    const playWithSelect = document.getElementById("playWith");
    playWithSelect.addEventListener("change", () => this.playerSelect());

    this.restartBtn.addEventListener("click", () => this.restart());
  },

  computerPlay: function (cell) {
    if (this.gameover || this.playWith === "1") return;

    const availableCells = this.cells.filter(
      (cell) => cell.querySelector("span").querySelector("i") === null
    );

    if (availableCells.length === 0) return;

    const randomCell =
      availableCells[Math.floor(Math.random() * availableCells.length)];
    const cellIndex = this.cells.indexOf(randomCell);

    console.log("comp turn now");
    this.x(randomCell);
    this.xClick.push(cellIndex);

    if (this.checkWin(this.xClick)) {
      console.log("Player X wins!");
      this.changingTxt.textContent = `X wins!`;
      this.endGame();
      return;
    }
    this.computerTurn = false;

    this.currentPlayer = this.player[1];
    this.checkTie();
  },

  handleCellClick: function (cell) {
    if (this.gameover || (this.computerTurn && this.playWith !== "1")) return;

    if (cell.querySelector("span").querySelector("i")) {
      return; // Do nothing if the cell already has an element
    }

    const cellIndex = this.cells.indexOf(cell);

    if (this.currentPlayer === this.player[0]) {
      this.x(cell);
      this.xClick.push(cellIndex);
      if (this.checkWin(this.xClick)) {
        console.log("Player X wins!");
        this.changingTxt.textContent = `X wins!`;
        this.endGame();
        return;
      }
      this.currentPlayer = this.player[1];
    } else if (this.currentPlayer === this.player[1]) {
      this.o(cell);
      this.oClick.push(cellIndex);
      if (this.checkWin(this.oClick)) {
        console.log("Player O wins!");
        this.changingTxt.textContent = `O wins!`;
        this.endGame();
        return;
      }
      this.currentPlayer = this.player[0];
    }
    this.checkTie();

    if (!this.gameover && this.playWith === '0'){
        this.computerTurn = true;
        setTimeout(() => this.computerPlay(), 500);
    }
  },

  x: function (cell) {
    console.log("x");
    this.changingTxt.textContent = `0's turn`;
    let i = document.createElement("i");
    i.classList.add("fa", "fa-x");
    cell.querySelector("span").appendChild(i);
    if (this.gameover) return;
    this.currentPlayer = this.player[1];
  },

  o: function (cell) {
    console.log("o");
    this.changingTxt.textContent = `X's turn`;
    let i = document.createElement("i");
    i.classList.add("fa", "fa-0");
    cell.querySelector("span").appendChild(i);
    if (this.gameover) return;
    this.currentPlayer = this.player[0];
  },

  checkWin: function (moves) {
    return this.winning_combinations.some((combination) =>
      combination.every((index) => moves.includes(index))
    );
  },

  checkTie: function () {
    const allCellsFilled = this.cells.every(
      (cell) => cell.querySelector("span").querySelector("i") !== null
    );
    const xHasWon = this.checkWin(this.xClick);
    const oHasWon = this.checkWin(this.oClick);

    if (allCellsFilled && !xHasWon && !oHasWon) {
        console.log('Tie!');
        this.changingTxt.textContent = `Tie!`;
        this.endGame();
    }
  },

  playerSelect: function () {
    this.playWith = document.getElementById("playWith").value;
    this.restart();
    console.log(this.playWith);

    if (this.playWith === "0") {
      console.log("0");
      this.computerTurn = true;
      this.computerPlay();
    } else if (this.playWith == "1") {
      console.log("1");
      this.computerTurn = false;
    }
  },

  endGame: function () {
    this.gameOver = true; // Set the game over flag
    this.disableClickEvents();
  },

  disableClickEvents: function () {
    this.cells.forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
  },

  enableClickEvents: function () {
    this.cells.forEach((cell) => {
      cell.style.pointerEvents = "auto";
    });
  },

  restart: function () {
    this.enableClickEvents();
    this.xClick = [];
    this.oClick = [];
    this.gameOver = false;
    console.log("restart");
    this.cells.forEach((cell) => {
      const span = cell.querySelector("span");
      if (span) {
        const i = span.querySelector("i");
        if (i) {
          span.removeChild(i);
        }
      }
    });
    this.changingTxt.textContent = `X's turn!`;
    if(this.playWith== "1"){
        this.currentPlayer = this.player[0];
    } else {
        this.computerPlay();
    }
    
  },
};

tic_tac_toe.init();
