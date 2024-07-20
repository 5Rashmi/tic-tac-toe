const tic_tac_toe = {
    board: document.getElementById("board"),
    restartBtn: document.getElementById("restartBtn"),
    changingTxt: document.getElementsByClassName("changing-text")[0],
    resultDisplay: document.getElementsByClassName("result")[0],

    cells: [
        document.getElementById("cell1"),
        document.getElementById("cell2"),
        document.getElementById("cell3"),
        document.getElementById("cell4"),
        document.getElementById("cell5"),
        document.getElementById("cell6"),
        document.getElementById("cell7"),
        document.getElementById("cell8"),
        document.getElementById("cell9")
    ],
    
    gamover: false,
    playWith: "0",
    xTurn: true,
    computerSymbol: null,

    init: function(){
        this.winning_seqs = [
            [this.cells[0], this.cells[1], this.cells[2]],
            [this.cells[3], this.cells[4], this.cells[5]],
            [this.cells[6], this.cells[7], this.cells[8]],
            [this.cells[0], this.cells[3], this.cells[6]],
            [this.cells[1], this.cells[4], this.cells[7]],
            [this.cells[2], this.cells[5], this.cells[8]],
            [this.cells[0], this.cells[4], this.cells[8]],
            [this.cells[2], this.cells[4], this.cells[6]],
        ];
        this.restartBtn.addEventListener("click", () => this.restart());

        const playWithSelect = document.getElementById("playWith");
        playWithSelect.addEventListener("change", () => this.player());

        this.cells.forEach(cell => {
            cell.addEventListener("click", () => this.handleCellClick(cell));
        });

        this.restart();
    },

    player: function() {
        this.playWith = document.getElementById("playWith").value;
        this.restart();
        if( this.playWith === "0"){
            console.log("selected");
            this.computer();
        } else if(this.playWith === "1"){
            this.friend();
        }
    },

    computer: function(){
        console.log("computer");
        this.random();
        for(let i =0; i < this.cells.length; i++)
        {
            if (!this.win || this.tie){
                this.x();
                this.o();
            }
        }
        return message();
    },

    random: function(){
        let randomNumber = Math.random();
        if ( randomNumber < 0.5){
            this.computerSymbol = 'X';
            this.changingTxt.innerHTML = `Computer is X. Your turn.`;
            this.xTurn = true;
        }else{
            this.computerSymbol = 'O';
            this.changingTxt.innerHTML = `Computer is O. Your turn.`;
            this.xTurn = false;
        }
        if (this.computerSymbol === 'X' && !this.xTurn || this.computerSymbol === 'O' && this.xTurn){
            this.computerMove();
        }
    },

    computerMove: function(){
        let availableMoves = this.getAvailableMoves();
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        this.makeMove(move, this.computerSymbol);
        this.checkGameStatus();
    },

    getAvailableMoves: function(){
        let availableMoves = [];
        for(let i = 0; i< this.cells.length; i++){
            if (!this.cells[i].querySelector('span').firstChild){
                availableMoves.push(i);
            }
        }
        return availableMoves;
    },

    makeMove: function(position, symbol){
        if (symbol === 'X'){
            this.x(this.cells[position]);
        }else if(symbol === 'O'){
            this.o(this.cells[position]);
        }
        this.xTurn = (symbol === 'X');
    },

    checkGameStatus: function(){
        //Logic to check for win, tie, or continue game
        this.win = this.checkWin();
        this.tie = this.checkTie();
        if(this.win || this.tie){
            this.game_is_over();
        }
    },

    message: function(){
        if(this.win){
            return `Game over! ${this.computerSymbol} Wins!`;
        }else if(this.tie){
            return `Game Over! It's a Tie!`;
        }else{
            return "Game is ongoing...";
        }
    },

    friend: function(){
        console.log("friend");
        for (let i = 0; i<this.cells.length; i++)
        {
            if(this.xTurn){
            this.x();
            this.changingTxt.innerHTML = `Player O's turn`;
            } else{
            this.o();
            this.changingTxt.innerHTML = `Player X's turn`;
            }
        }
        return message();
    },

    checkWin: function(){
        let winningSymbol = null;
        for (let seq of this.winning_seqs){
            let symbols = seq.map(cell => cell.querySelector('span').firstChild ? cell.querySelector('span').firstChild.classList[1] : null);
            if (symbols.every(symbol => symbol && symbol === symbols[0])){
                winningSymbol = symbols[0];
                break;
            }
        }
        if(winningSymbol){
            this.changingTxt.innerHTML = `Player ${winningSymbol === 'fa-x' ? 'X' : 'O'} wins!`;
            this.game_is_over();
        }
        return winningSymbol;
    },

    checkTie: function(){
        if(this.is_game_over() && !this.checkWin()){
            this.resultDisplay.innerHTML = "It's a tie!";
            this.game_is_over();
            return true;
        }
        return false;
    },

    x: function(cell){
        let i = document.createElement("i");
        i.classList.add("fa","fa-x");
        cell.querySelector('span').appendChild(i);
        this.xTurn = false;
    },

    o: function(cell){
        let i = document.createElement("i");
        i.classList.add("fa","fa-0");
        cell.querySelector('span').appendChild(i);
        this.xTurn = true;
    },

    game_is_over: function(){
        this.gamover = true;
        console.log('Game Over');
    },

    is_game_over: function(){
        return !this.cells.some(cell => !cell.querySelector('span').firstChild);
    },

    restart: function(){
        if(this.is_game_over() || this.gamover){
            this.cells.forEach(cell => cell.querySelector('span').innerHTML = '');
            this.gamover = false;
            this.xTurn = true;
            console.log('game restarted');
        } else if (confirm('Are you sure you want to restart the game?')){
            this.cells.forEach(cell => cell.querySelector('span').innerHTML = '');
            this.gamover = false;
            this.xTurn = true;
            console.log('game has been restarted');
        }
    },

    handleCellClick: function(cell){
        if (this.gamover || cell.querySelector('span').firstChild) return;
        if (this.xTurn){
            this.x(cell);
        } else {
            this.o(cell);
        }
        this.checkWin();
        this.checkTie();
    }

};

tic_tac_toe.init();