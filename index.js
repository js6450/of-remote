let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', function (req, res){
    res.sendFile(__dirname + "/index.html");
});

http.listen(3000, function(){
    console.log('listening on 3000');
});

let remoteData = [];

io.on('connection', function(socket){

    console.log(socket.id + "connected");

    let emitInterval = setInterval(() => {
        if(remoteData){
            socket.emit('server-event', remoteData);

            remoteData = [];
        }
    }, 100);


    socket.on('message', function(data){
        remoteData = data;
    });
});

io.on('disconnect', function(socket){
    console.log(socket.id + "disconnected");
});