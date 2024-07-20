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
        console.log('click');

        if(cell.querySelector('span').textContent !== '') return;
        
        if(this.currentPlayer === this.player[0]){
            this.x(cell);
        }else if(this.currentPlayer === this.player[1]){
            this.o(cell);
        }

        
    },

    x: function(cell){
        console.log('x');
        this.changingTxt.textContent = `0's turn`;
        let i = document.createElement("i");
        i.classList.add("fa","fa-x");
        cell.querySelector('span').appendChild(i);
        this.currentPlayer = this.player[1];
    },

    o: function(cell){
        console.log('o');
        this.changingTxt.textContent = `X's turn`;
        let i = document.createElement("i");
        i.classList.add("fa","fa-0");
        cell.querySelector('span').appendChild(i);
        this.currentPlayer = this.player[0];
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

    restart: function(){
        console.log('restart');
        for(let i =0;i<this.cells.length; i++){
            let span = this.cells[i].querySelector('span');
            if (span) {
                span.textContent = '';
            }
        }
        this.changingTxt.textContent = `X's turn!`;
        this.currentPlayer = this.player[0];
    }
};

tic_tac_toe.init();
