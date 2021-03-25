const fs = require('fs'),
express = require('express'),
app = express(),
http = require('http').Server(app, ()=>{console.log('Connection established.')}),
io = require('socket.io')(http);

const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./activeUsers');

const port = '2000';

app.use(express.static('public'));
app.use(express.json({limit: '5mb'}));

app.get('/', (req, res)=>{res.sendFile(__dirname + '/index.html')});

fs.readFile('./users.json', (err, data)=>{
    if(err) throw err;
    const users = JSON.parse(data);
    app.post('/login', (req, res)=>{
        for(let i=0; i<users.length; i++){
            if(req.body.username == users[i].username && req.body.password == users[i].password){
                res.json({status: 'success'});
                localStorage.setItem('user' +i, JSON.stringify({username: req.body.username, fullname: users[i].fullname, image: users[i].image, score: users[i].score}));
                break;
            }
            if(i == users.length-1 && req.body.username !== users[i].username || i == users.length-1 && req.body.password !== users[i].password){
                res.json({status: 'fail'});
                break;
            }
        }
    });
    app.post('/register', (req, res)=>{
        for(let i=0; i<users.length; i++){
            if(i == users.length-1 && req.body.username !== users[i].username){
                i++;
                res.json({status: 'success'});
                break;
            }
            if(req.body.username == users[i].username){
                res.json({status: 'fail'});
                break;
            }
        }
    });
    app.post('/finishreg', (req, res)=>{
        for(let j=0; j<users.length; j++){
            if(j == users.length-1 && req.body.username !== users[j].username){
                res.json({status: 'success'});
                localStorage.setItem('user' +j, JSON.stringify({username: req.body.username, fullname: req.body.fullname, image: req.body.image, score: 0}));
                const newUser = {
                    username: req.body.username,
                    password: req.body.password,
                    fullname: req.body.fullname,
                    image: req.body.image,
                    score: 0
                }
                users.push(newUser);
                fs.writeFile('./users.json', JSON.stringify(users), (err)=>{
                    if(err) throw err;
                });
                break;
            }
            if(req.body.username == users[j].username){
                res.json({status: 'fail'});
                break;
            }
        }
    });
    app.post('/check', (req, res)=>{
        for(let i=0; i<users.length; i++){
            let usersHolder = {};
            if(i == users.length-1 && req.body.check !== users[i].username){
                res.json({status: 'fail'});
                break;
            }
            if(req.body.check == users[i].username){
                if(localStorage.getItem('user' +i) !== null){
                    usersHolder[i] = JSON.parse(localStorage.getItem('user' +i));
                    res.json({status: 'success', username: usersHolder[i].username, fullname: usersHolder[i].fullname, image: usersHolder[i].image, score: usersHolder[i].score});
                    break;
                }
                else{
                    res.json({status: 'fail'});
                    break;
                }
            }
        }
    });
    app.post('/profilepic', (req, res)=>{
        for(let i=0; i<users.length; i++){
            let usersHolder = [];
            if(i == users.length-1 && req.body.username !== users[i].username){
                res.json({status: 'fail'});
            }
            if(req.body.username == users[i].username){
                if(localStorage.getItem('user' +i) !== null){
                    if(req.body.image !== null || req.body.image !== ""){
                        res.json({status: 'success'});
                        usersHolder[i] = JSON.parse(localStorage.getItem('user' +i));
                        usersHolder[i].image = req.body.image;
                        localStorage.setItem('user' +i, JSON.stringify(usersHolder[i]));
                        users[i].image = usersHolder[i].image;
                        fs.writeFile('./users.json', JSON.stringify(users), (err)=>{
                            if(err) throw err;
                        });
                        break;
                    }
                    if(req.body.image == null || req.body.image == ""){
                        res.json({status: 'success'});
                        break;
                    }
                }
            }
        }
    })
    app.post('/password', (req, res)=>{
        for(let i=0; i<users.length; i++){
            if(i == users.length-1 && req.body.username !== users[i].username || i == users.length-1 && req.body.oldPassword !== users[i].password){
                res.json({status: 'fail'});
                break;
            }
            if(req.body.username == users[i].username && req.body.oldPassword == users[i].password){
                users[i].password = req.body.newPassword;
                res.json({status: 'success'});
                localStorage.removeItem('user', +i);
                fs.writeFile('./users.json', JSON.stringify(users), (err)=>{
                    if(err) throw err;
                });
                break;
            }
        }
    })
    app.post('/fullname', (req, res)=>{
        for(let i=0; i<users.length; i++){
            if(req.body.username == users[i].username && req.body.password == users[i].password){
                users[i].fullname = req.body.fullname;
                res.json({status: 'success'});  
                localStorage.setItem('user' +i, JSON.stringify({username: req.body.username, fullname: users[i].fullname, image: users[i].image, score: users[i].score}));
                fs.writeFile('./users.json', JSON.stringify(users), (err)=>{
                    if(err) throw err;
                });
                break;
            }
            if(i == users.length-1 && req.body.username !== users[i].username || i == users.length-1 && req.body.password !== users[i].password){
                res.json({status: 'fail'});
                break;
            }
        }
    })
    app.post('/score', (req, res)=>{
        for(let i=0; i<users.length; i++){
            if(req.body.username == users[i].username){
                users[i].score += req.body.score;
                localStorage.setItem('user' +i, JSON.stringify({username: req.body.username, fullname: users[i].fullname, image: users[i].image, score: users[i].score}));
                fs.writeFile('./users.json', JSON.stringify(users), (err)=>{
                    if(err) throw err;
                });
            }
            if(i == users.length-1 && req.body.username !== users[i].username){
                break;
            }
        }
    })
    app.post('/logout', (req, res)=>{
        for(let i=0; i<users.length; i++){
            if(i == users.length-1 && req.body.username !== users[i].username){
                res.json({status: 'fail'})
                break;
            }
            if(req.body.username == users[i].username){
                if(localStorage.getItem('user' +i) !== null){
                    localStorage.removeItem('user' +i);
                    res.json({status: 'success'});
                    break;
                }
                else{
                    res.json({status: 'fail'});
                    break;
                }
            }
        }
    });
});
fs.readFile('./public/game/topPlayers/local.json', (err, data)=>{
    if(err) throw err;
    const localUsers = JSON.parse(data);
    app.post('/localUsers', (req, res)=>{
        for(let i in localUsers){
            if(i == localUsers.length-1 && req.body.name !== localUsers[i].name){
                localUsers.push(req.body);
                fs.writeFile('./public/game/topPlayers/local.json', JSON.stringify(localUsers), (err)=>{
                    if(err) throw err;
                });
            }
            if(req.body.name == localUsers[i].name){
                let score = localUsers[i].score;
                score += req.body.score;
                localUsers[i].score = score;
                fs.writeFile('./public/game/topPlayers/local.json', JSON.stringify(localUsers),(err)=>{
                    if(err) throw err;
                });
            }
        }
    });
});



http.listen(port, ()=>{
    console.log(`\nTic Tac Toe server is running on port: ${port}`);
});

var players = {},
    unmatched;

function joinGame(socket){
    players[socket.id] = {
        opponent: unmatched,
        symbol: 'X',
        socket: socket
    };
    if (unmatched){
        players[socket.id].symbol = 'O';
        players[unmatched].opponent = socket.id;
        unmatched = null;
    } else{
        unmatched = socket.id;
    }
}
function getOpponent(socket){
    if (!players[socket.id].opponent){
        return;
    }
    return players[
        players[socket.id].opponent
    ].socket;
}
io.on('connection', (socket)=>{
    console.log("(Multiplayer game) Connection established...", socket.id);
    joinGame(socket);

    if (getOpponent(socket)){
        socket.emit('game.begin',{
            symbol: players[socket.id].symbol
        });
        getOpponent(socket).emit('game.begin',{
            symbol: players[getOpponent(socket).id].symbol
        });
    }
    socket.on('make.move', (data)=>{
        if (!getOpponent(socket)){
            return;
        }
        console.log("Move made by : ", data);
        socket.emit('move.made', data);
        getOpponent(socket).emit('move.made', data);
    });
    socket.on('disconnect', ()=>{
        if (getOpponent(socket)){
            getOpponent(socket).emit('opponent.left');
        }
    });
});
