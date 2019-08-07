const server = require('http').createServer()
const io = require('socket.io')(server)


io.on('connection', client => {
    console.log(`CONECTADO`)
  client.on('event', data => { console.log(`Dados recebidos: ${data}`) })
  client.on('disconnect', () => { /* … */ });

  client.on('chat message', function(msg){
    io.emit('chat message', msg);
});

client.on('vencedor', function(msg){
    io.emit('vencedor', msg);
});
})


server.listen(3000);


