const tic_tac_toe = {
    board: document.getElementById('board'),
    player: ["X", "O"],
    currentPlayer: null,
    changingTxt: document.querySelector('.changing-text'),
    result: document.querySelector('.result'),
    restartBtn: document.getElementById('restartBtn'),
    playWith: '0',

    Xpoints: [],
    Opoints: [],

    xClick: [],
    oClick: [],
    gameover: false,

    cells: Array.from(document.querySelectorAll(".cell")),

    init: function(){
        this.winning_combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        this.currentPlayer = this.player[0];
        this.changingTxt.textContent = `X's turn!`;

        this.cells.forEach(cell => {
            cell.addEventListener("click", () => this.handleCellClick(cell));
        });

        if(this.playWith === '0'){
            console.log('comp by default');
            this.computerPlay();
        }else if(this.playWith === '1'){
            this.friend();
        }

        const playWithSelect = document.getElementById("playWith");
        playWithSelect.addEventListener("change", () => this.playerSelect());

        this.restartBtn.addEventListener("click", () => this.restart());
    },

    handleCellClick: function(cell){
        if(this.gameover) return;
        const cellIndex = this.cells.indexOf(cell);
        
        if(this.currentPlayer === this.player[0]){
            this.x(cell);
            this.xClick.push(cellIndex);
            if (this.checkWin(this.xClick)) {
                console.log('Player X wins!');
                this.changingTxt.textContent = `X wins!`;
                this.endGame();
                return;
            }
        }else if(this.currentPlayer === this.player[1]){
            this.o(cell);
            this.oClick.push(cellIndex);
            if (this.checkWin(this.oClick)) {
                console.log('Player O wins!');
                this.changingTxt.textContent = `O wins!`;
                this.endGame();
                return;
            }
        }
    },

    x: function(cell){
        console.log('x');
        this.changingTxt.textContent = `0's turn`;
        let i = document.createElement("i");
        i.classList.add("fa","fa-x");
        cell.querySelector('span').appendChild(i);
        if(this.gameover) return;
        this.currentPlayer = this.player[1];
    },

    o: function(cell){
        console.log('o');
        this.changingTxt.textContent = `X's turn`;
        let i = document.createElement("i");
        i.classList.add("fa","fa-0");
        cell.querySelector('span').appendChild(i);
        if(this.gameover) return;
        this.currentPlayer = this.player[0];
    },

    checkWin: function(moves){
        return this.winning_combinations.some(combination => 
            combination.every(index => moves.includes(index))
        );
    },
    
    computerPlay: function(){

    },

    friend: function(){
        
    },

    playerSelect: function(){
        this.playWith = document.getElementById("playWith").value;
        if(this.playWith === '0'){
            this.restart();
            console.log('0');
            this.computerPlay();
        }else if(this.playWith == '1'){
            this.restart();
            console.log('1');
            this.friend();
        }
    },

    endGame: function() {
        this.gameOver = true; // Set the game over flag
        this.disableClickEvents();
    },

    disableClickEvents: function() {
        this.cells.forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
    },

    enableClickEvents: function(){
        this.cells.forEach(cell => {
            cell.style.pointerEvents = 'auto';
        });
    },

    restart: function(){
        this.enableClickEvents();
        this.xClick = [];
        this.oClick = [];
        this.gameOver = false;
        console.log('restart');
        this.cells.forEach(cell => {
            const span = cell.querySelector('span');
            if(span){
                const i = span.querySelector('i');
                if(i){
                    span.removeChild(i);
                }
            }
           });
        this.changingTxt.textContent = `X's turn!`;
        this.currentPlayer = this.player[0];
    }
};

tic_tac_toe.init();
