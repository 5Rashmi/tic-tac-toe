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

        this.player();
    },

    player: function() {
        this.playWith = document.getElementById("playWith").value;
        
        if( this.playWith === "0"){
            console.log("selected");
            this.restart();
            this.computer();
        } else if(this.playWith === "1"){
            this.restart();
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
    },

    friend: function(){
        console.log("friend");
        if(this.xTurn){
            this.x();
            this.changingTxt.innerHTML = `Player O's turn`;
        } else{
            this.o();
            this.changingTxt.innerHTML = `Player X's turn`;
        }
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

    random: function(){
        let randomNumber = Math.random();
        if ( randomNumber < 0.5){
            this.computer();
            this.changingTxt.innerHTML = `Computer's turn`;
        }else{
            this.person();
            this.changingTxt.innerHTML = `Your turn`;
        }
    },

    game_is_over: function(){
        this.gamover = true;
        console.log('Game Over');
    },

    is_game_over: function(){
        return !this.cells.some(cell => !cell.firstChild);
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


    }

};

tic_tac_toe.init();