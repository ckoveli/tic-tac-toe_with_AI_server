// Velickovic Djordje
const username = localStorage.getItem('username');

function check(){
    const check = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({check: username})
    }
    fetch('/check', check).then(res => res.json()).then((res)=>{
        if(res.status == 'success'){
        }
        if(res.status == 'fail'){
            window.location.href = '../login/login.html';
        }
    });
}

var socket = io.connect(),
    myTurn = true, symbol;
var matches = ['XXX', 'OOO'];

function getBoard(){
    var obj = {};

    $('.cell').each(function (){
        obj[$(this).attr('id')] = $(this).text() || '';
    });
    console.log("state: ", obj);
    return obj;
}
function isGameOver(){
    var state = getBoard();
    console.log("Board State: ", state);

    var rows = [
        state.a0 + state.a1 + state.a2,
        state.b0 + state.b1 + state.b2,
        state.c0 + state.c1 + state.c2,
        state.a0 + state.b1 + state.c2,
        state.a2 + state.b1 + state.c0,
        state.a0 + state.b0 + state.c0,
        state.a1 + state.b1 + state.c1,
        state.a2 + state.b2 + state.c2
    ];

    for (var i = 0; i < rows.length; i++){
        if (rows[i] === matches[0] || rows[i] === matches[1]){
            return true;
        }
    }
    return false;
}
function renderTurnMessage(){
    if (!myTurn){
        document.querySelector(".rezultat").style.marginLeft = "-50px";
        document.querySelector(".rezultat").style.width = "400px";
        $('#messages').text('Your opponent\'s turn');
        $('.cell').attr('disabled', true);
    } else{
        document.querySelector(".rezultat").style.marginLeft = "-50px";
        document.querySelector(".rezultat").style.width = "400px";
        $('#messages').text('Your turn.');
        $('.cell').removeAttr('disabled');

    }
}
function makeMove(e){
    e.preventDefault();

    if (!myTurn){
        return;
    }
    if ($(this).text().length){
        return;
    }
    socket.emit('make.move',{
        symbol: symbol,
        position: $(this).attr('id')
    });
}
socket.on('move.made', function (data){
    $('#' + data.position).text(data.symbol);

    myTurn = (data.symbol !== symbol);

    if (!isGameOver()){
        return renderTurnMessage();
    }
    if (myTurn){
        document.getElementById("messages").style.color = "red";
        $('#messages').text('You lost!');
    } else{
        document.getElementById("messages").style.color = "#e67e00";
        $('#messages').text('You win!');
        const updateScore = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username: username, score: 1})
        }
        fetch('/score', updateScore);
    }
    $('.cell').attr('disabled', true);
});
socket.on('game.begin', function (data){
    $("#symbol").html(data.symbol);  
    symbol = data.symbol;

    myTurn = (data.symbol === 'X');
    renderTurnMessage();
});
socket.on('opponent.left', function (){
    document.querySelector(".rezultat").style.width = "400px";
    document.getElementById("messages").style.fontSize = "20px";
    document.querySelector(".rezultat").style.marginLeft= "-50px";
    $('#messages').text('Your opponent left the game.');
    $('.cell').attr('disabled', true);
});
$(function (){
    $('.field button').attr('disabled', true);
    $(".cell").on("click", makeMove);
});

// Velickovic Djordje