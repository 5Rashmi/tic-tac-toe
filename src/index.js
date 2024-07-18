const tic_tac_toe = {
    board: document.getElementById("board"),
    restartBtn: document.getElementById("restartBtn"),
    changingTxt: document.getElementsByClassName("changing-text"),
    resultDisplay: document.getElementsByClassName("result"),

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
        this.restartBtn.addEventListener("click", () => this.restart);

        const playWithSelect = document.getElementById("playWith");
        playWithSelect.addEventListener("change", () => this.player());

        this.player();
    },

    restart: function(){
        console.log('Game restarted!');
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
    },

    friend: function(){
        console.log("friend");
    }

};

tic_tac_toe.init();