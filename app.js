const server = require('http').createServer()
const io = require('socket.io')(server)


io.on('connection', client => {
    console.log(`CONECTADO`)
  client.on('event', data => { console.log(`Dados recebidos: ${data}`) })
  client.on('disconnect', () => { /* … */ });
})


server.listen(3000);


