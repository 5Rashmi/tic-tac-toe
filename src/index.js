const cell = document.getElementsByClassName("cell");
const changingTxt = document.getElementsByClassName("changing-text");
const resultDisplay = document.getElementsByClassName("result");
const restartBtn = document.getElementById("restartBtn");
const playWith = document.getElementById("playWith").value;

const cell1 = document.getElementById("cell1");
const cell2 = document.getElementById("cell2");
const cell3 = document.getElementById("cell3");
const cell4 = document.getElementById("cell4");
const cell5 = document.getElementById("cell5");
const cell6 = document.getElementById("cell6");
const cell7 = document.getElementById("cell7");
const cell8 = document.getElementById("cell8");
const cell9 = document.getElementById("cell9");

restartBtn.addEventListener("click", restart());

const Player = () => {
    playWith = document.getElementById("playWith").value;
    restart();
}


