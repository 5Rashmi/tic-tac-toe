const tic_tac_toe = {
    playMode: 'computer',
    player: ['X', 'O'],
    currentPlayer: 'X',
    board: Array(9).fill(null),

    init(){
        document.getElementById('playWith').addEventListener('change', (e) =>{
            this.playMode = e.target.value == '0' ? 'computer' : 'friend';
            this.restart();
        });

        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => this.handleClick(e));
        });

        document.getElementById('restartBtn').addEventListener('click', () => this.restart());
    },

    handleClick(event){
        
    },
    restart(){
        this.board.fill(null);
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
        document.querySelector('.changing-text').innerHTML = `${this.currentPlayer}'s turn`;
    }
}

tic_tac_toe.init();