// Velickovic Djordje

let tabla;
let human ='X';
let ai = '0';
var playerScore = 0;
var aiScore = 0;
var replay = document.getElementById("playBtn");
var music = new Audio(); music.src = "../../assets/music/backgroundMusic.mp3";
const polja = document.querySelectorAll('.cell');
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6]
];

function izbor(sym){
  human = sym;
  ai = sym==='O' ? 'X' :'O';
  tabla = Array.from(Array(9).keys());
  music.play();
  for(let i=0; i<polja.length; i++){
    polja[i].addEventListener('click', turnClick, false);
  }
  if(ai === 'X'){
    turn(najUgol(),ai);
  }
  document.querySelector('.izbor').style.display = "none";
  document.querySelector(".gameStart").style.display = "block";
  document.querySelector(".field").style.display = "inline-block";
  document.querySelector(".playerScore").style.display = "block"; 
  document.querySelector(".playerScore").innerHTML = "YOU: " +playerScore;
  document.querySelector(".aiScore").style.display = "block"; 
  document.querySelector(".aiScore").innerHTML = "AI: " +aiScore; 
}
function novaIgra(){
  replay.style.display = "none";
  document.querySelector(".field").style.display = "none";
  document.querySelector('.rezultat').style.display = "none";
  document.querySelector('.rezultat .text').innerText ="";
  document.querySelector(".playerScore").style.display = "none";
  document.querySelector(".aiScore").style.display = "none";
  document.querySelector('.izbor').style.display = "block";
  for(let i=0; i<polja.length; i++){
    polja[i].innerText = '';
    polja[i].style.removeProperty('background-color');
    polja[i].style.color = "white";
  }
}
function turnClick(square){
  if(typeof tabla[square.target.id] ==='number'){
    turn(square.target.id, human);
    document.querySelector(".gameStart").style.display = "none";
    /*var soundX = new Audio();
    soundX.src = "../../assets/sounds/soundX.mp3"; // This is the sound effect when X is placed, but I prefered to keep it commented out cuz it has annoying playback latency. Uncomment if you wanna see what it does.
    soundX.play();*/
    if(!vidiPob(tabla, human) && !vidiTie())  
      turn(najUgol(), ai);
  }
}
function turn(squareId, player){
  tabla[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let igraPob = vidiPob(tabla, player);
  if(igraPob) gameOver(igraPob);
  vidiTie();
}
function vidiPob(board, player){
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let igraPob = null;
  for(let [index, win] of winCombos.entries()){
    if(win.every(elem => plays.indexOf(elem) > -1)){
      igraPob = {index: index, player: player};
      break;
    }
  }
  return igraPob;
}
function gameOver(igraPob){
  for(let index of winCombos[igraPob.index]) {
    document.getElementById(index).style.color = 
      igraPob.player === human ? "orange" : "red";
  }
  for(let i=0; i<polja.length; i++){
    polja[i].removeEventListener('click', turnClick, false);
  }
  pobednik(igraPob.player === human ? "You win!" : "AI Wins!");
  if(igraPob.player === human){
    var win = new Audio(); win.src = "../../assets/sounds/soundWin.mp3"; win.play();
    playerScore++;
    document.querySelector(".playerScore").innerHTML = "YOU: " +playerScore;
  } else{
    var lost = new Audio(); lost.src = "../../assets/sounds/soundLost.mp3"; lost.play();
    aiScore++;
    document.querySelector(".aiScore").innerHTML = "AI: " +aiScore;
  }
  replay.style.display = "block";
}
function pobednik(who){
  document.querySelector(".rezultat").style.display = "block";
  document.querySelector(".rezultat .text").innerText = who;
}
function isprazniPolja(){
  return tabla.filter((elm, i) => i===elm);
} 
function najUgol(){
  return minimax(tabla, ai).index;
}  
function vidiTie(){
  if(isprazniPolja().length === 0){
    for(cell of polja){
      cell.removeEventListener('click',turnClick, false);
      cell.style.background = "rgba(230, 126, 0, 0.5)";
    }
    pobednik("Tie");
    music.pause();
    var tie = new Audio(); tie.src = "../../assets/sounds/soundTie.mp3"; tie.play();
    replay.style.display = "block";
    return true;
  } 
  return false;
}
function minimax(newBoard, player){
  var availSpots = isprazniPolja(newBoard); 
  if(vidiPob(newBoard, human)){
    return {score: -10};
  } else if(vidiPob(newBoard, ai)){
    return {score: 10};
  } else if(availSpots.length === 0){
    return {score: 0};
  } 
  var moves = [];
  for(let i=0; i<availSpots.length; i ++){
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;   
    if(player === ai)
      move.score = minimax(newBoard, human).score;
    else
       move.score = minimax(newBoard, ai).score;
    newBoard[availSpots[i]] = move.index;
    if((player === ai && move.score === 10) || (player === human && move.score === -10))
      return move;
    else 
      moves.push(move);
  }  
  let najPotez, najScore;
  if(player === ai){
    najScore = -1000;
    for(let i=0; i<moves.length; i++){
      if(moves[i].score > najScore){
        najScore = moves[i].score;
        najPotez = i;
      }
    }
  } else{
      najScore = 1000;
      for(let i=0; i<moves.length; i++){
      if(moves[i].score < najScore){
        najScore = moves[i].score;
        najPotez = i;
      }
    }
  } 
  return moves[najPotez];
}
function soundOn(){
  music.pause();
  document.querySelector(".soundOnBtn").style.display = "none";
  document.querySelector(".soundOffBtn").style.display = "block";
}
function soundOff(){
  music.play();
  document.querySelector(".soundOffBtn").style.display = "none";
  document.querySelector(".soundOnBtn").style.display = "block";
}

novaIgra();

// Velickovic Djordje
