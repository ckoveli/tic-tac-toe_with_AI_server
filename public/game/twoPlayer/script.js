// Velickovic Djordje

var cell;
var player = "X";
var polja = document.querySelectorAll(".cell");
var music = new Audio();
var scoreX = 0;
var scoreO = 0;

var cell0 = document.getElementById("0"); 
var cell1 = document.getElementById("1");
var cell2 = document.getElementById("2");
var cell3 = document.getElementById("3");
var cell4 = document.getElementById("4");
var cell5 = document.getElementById("5");
var cell6 = document.getElementById("6");
var cell7 = document.getElementById("7");
var cell8 = document.getElementById("8");

function novaIgra(){
    document.getElementById("playBtn").style.display = "none";
    document.querySelector(".field").style.display = "none";
    document.querySelector('.rezultat').style.display = "none";
    document.querySelector('.rezultat .text').innerText ="";
    document.querySelector('.izbor').style.display = "none";

    music.src = "../../assets/music/backgroundMusic.mp3"; music.play();

    cell0.style.color = "white";
    cell1.style.color = "white";
    cell2.style.color = "white";
    cell3.style.color = "white";
    cell4.style.color = "white";
    cell5.style.color = "white";
    cell6.style.color = "white";
    cell7.style.color = "white";
    cell8.style.color = "white";

    for(let i=0; i<polja.length; i++){
        polja[i].innerText = '';
        polja[i].setAttribute('onclick', 'cellClick(this)');
    }
    cellClick();
}
function cellClick(cell) {
    document.querySelector(".field").style.display = "block";
    document.querySelector(".izbor").style.display = "none";
    document.querySelector(".gameStart").style.display = "block"; 

    if(player === "X"){
        document.querySelector(".gameStart").innerText = "X goes first";
    } else{
        document.querySelector(".gameStart").innerText = "O goes first"; 
    }
    if(cell.id === "0"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
    else if(cell.id === "1"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    } 
    else if(cell.id === "2"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
    else if(cell.id === "3"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
    else if(cell.id === "4"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
    else if(cell.id === "5"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
    else if(cell.id === "6"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
    else if(cell.id === "7"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
    else if(cell.id === "8"){
        cell.innerHTML = player;
        playerTurn();
        disableClick(cell);
        checkWin(cell);
    }
}
function playerTurn(){
    document.querySelector(".gameStart").style.display = "none";

    if(player === "X"){
        player = "O";
        } else{
        player = "X";
    }
}
function disableClick(cell){
    if(cell.innerText === "X" || cell.innerHTML === "O"){
        cell.onclick = "";
    }
}
function checkWin(cell){
    if(cell0.innerHTML === "X" && cell1.innerHTML === "X" && cell2.innerHTML ==="X" || cell0.innerHTML === "O" && cell1.innerHTML === "O" && cell2.innerHTML ==="O"){
        cell0.style.color = "red"; cell1.style.color = "red"; cell2.style.color = "red";
        determineWinner(player);
    }
    else if(cell3.innerHTML === "X" && cell4.innerHTML === "X" && cell5.innerHTML ==="X" || cell3.innerHTML === "O" && cell4.innerHTML === "O" && cell5.innerHTML ==="O"){
        cell3.style.color = "red"; cell4.style.color = "red"; cell5.style.color = "red";
        determineWinner(player);
    }
    else if(cell6.innerHTML === "X" && cell7.innerHTML === "X" && cell8.innerHTML ==="X" || cell6.innerHTML === "O" && cell7.innerHTML === "O" && cell8.innerHTML ==="O"){
        cell6.style.color = "red"; cell7.style.color = "red"; cell8.style.color = "red";
        determineWinner(player);
    }
    else if(cell0.innerHTML === "X" && cell3.innerHTML === "X" && cell6.innerHTML ==="X" || cell0.innerHTML === "O" && cell3.innerHTML === "O" && cell6.innerHTML ==="O"){
        cell0.style.color = "red"; cell3.style.color = "red"; cell6.style.color = "red";
        determineWinner(player);
    }
    else if(cell1.innerHTML === "X" && cell4.innerHTML === "X" && cell7.innerHTML ==="X" || cell1.innerHTML === "O" && cell4.innerHTML === "O" && cell7.innerHTML ==="O"){
        cell1.style.color = "red"; cell4.style.color = "red"; cell7.style.color = "red";
        determineWinner(player);
    }
    else if(cell2.innerHTML === "X" && cell5.innerHTML === "X" && cell8.innerHTML ==="X" || cell2.innerHTML === "O" && cell5.innerHTML === "O" && cell8.innerHTML ==="O"){
        cell2.style.color = "red"; cell5.style.color = "red"; cell8.style.color = "red";
        determineWinner(player);
    }
    else if(cell0.innerHTML === "X" && cell4.innerHTML === "X" && cell8.innerHTML ==="X" || cell0.innerHTML === "O" && cell4.innerHTML === "O" && cell8.innerHTML ==="O"){
        cell0.style.color = "red"; cell4.style.color = "red"; cell8.style.color = "red";
        determineWinner(player);
    }
    else if(cell2.innerHTML === "X" && cell4.innerHTML === "X" && cell6.innerHTML ==="X" || cell2.innerHTML === "O" && cell4.innerHTML === "O" && cell6.innerHTML ==="O"){
        cell2.style.color = "red"; cell4.style.color = "red"; cell6.style.color = "red";
        determineWinner(player);
    }
}
function determineWinner(player){
    if(player === "O"){
        var playerX = document.getElementById("playerX").value;
        var soundWin = new Audio(); soundWin.src = "../../assets/sounds/soundWin.mp3"; soundWin.play();

        if(playerX === ""){
            document.querySelector(".rezultat").style.display = "block"; document.querySelector(".rezultat .text").innerHTML = "Player X wins!";
            document.getElementById("playBtn").style.display = "block";
        } else{
        document.querySelector(".rezultat").style.display = "block"; document.querySelector(".rezultat .text").innerHTML = "Player "+playerX+" wins!";
        document.getElementById("playBtn").style.display = "block";

        scoreX++;
        passScore(playerX, scoreX);
        }
    } else{
        var playerO = document.getElementById("playerO").value;
        var soundWin = new Audio(); soundWin.src = "../../assets/sounds/soundWin.mp3"; soundWin.play();
        if(playerO === ""){
            document.querySelector(".rezultat").style.display = "block"; document.querySelector(".rezultat .text").innerHTML = "Player O wins!";
            document.getElementById("playBtn").style.display = "block";
        } else{
        document.querySelector(".rezultat").style.display = "block"; document.querySelector(".rezultat .text").innerHTML = "Player "+playerO+" wins!";
        document.getElementById("playBtn").style.display = "block";

        scoreO++;
        passScore(playerO, scoreO);
        }
    }
}
function passScore(player, score){
    if(player == "" || player == null){
        return false;
    }
    const localUser = {
        name: player,
        score: score
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(localUser)
    }
    fetch('/localUsers', options);    
    return false;
}

// Velickovic Djordje 