const socket = io('http://localhost:3000')

 socket.on('connect', function(){})
 socket.on('event', function(data){})
 socket.on('disconnect', function(){})

 socket.on('chat message', function(msg){console.log('Quem jogou foi: ' + msg)})
 socket.on('vencedor', function(msg){console.log('O vencedor foi: ' + msg)})

 


// ENTRAR E SAIR
function ir() {
    window.location = "game.html"
}

function sair() {
    confirm("Tem certeza que deseja sair? Todo seu progresso será perdido")
}


const r = document.querySelector('.restart')
r.addEventListener('click', restart)

function restart() {
    window.location = 'game.html'
}





let jogada = 0
const itensGame = document.querySelectorAll('.box-item')


function verificar(event) {
    const element = event.target.querySelector('img')
    const div = element.closest('.box-item')


    if (jogada > 8) {
        alert('O Jogo Acabou!!!!!!!!!!!')
    }

    if (div.classList.contains("clicado")) {
        alert('Você está tentando roubar?!! Que feio......')
    }

    else {
        jogada++

        const imagem = (jogada % 2) ? 'jogador1' : 'jogador2'
        element.setAttribute('src', '/img/' + imagem + '.png')
        div.classList.add("clicado")


        if (imagem == 'jogador1') {
            div.classList.add("clicado1")
            socket.emit('chat message', 'X');

        }

        else {
            div.classList.add("clicado2")
            socket.emit('chat message', 'O');
        }
    }

    verificarVencedor()
}




function verificarVencedor(){
    let resultado = ''

    if (itensGame[0].classList.contains('clicado1') && itensGame[1].classList.contains('clicado1') && itensGame[2].classList.contains('clicado1')
        || itensGame[3].classList.contains('clicado1') && itensGame[4].classList.contains('clicado1') && itensGame[5].classList.contains('clicado1')
        || itensGame[6].classList.contains('clicado1') && itensGame[7].classList.contains('clicado1') && itensGame[8].classList.contains('clicado1')
        || itensGame[0].classList.contains('clicado1') && itensGame[3].classList.contains('clicado1') && itensGame[6].classList.contains('clicado1')
        || itensGame[1].classList.contains('clicado1') && itensGame[4].classList.contains('clicado1') && itensGame[7].classList.contains('clicado1')
        || itensGame[2].classList.contains('clicado1') && itensGame[5].classList.contains('clicado1') && itensGame[8].classList.contains('clicado1')
        || itensGame[0].classList.contains('clicado1') && itensGame[4].classList.contains('clicado1') && itensGame[8].classList.contains('clicado1')
        || itensGame[2].classList.contains('clicado1') && itensGame[4].classList.contains('clicado1') && itensGame[6].classList.contains('clicado1')) {

        resultado = 'Jogador1'
        
        ganhador(resultado)
    }

    else if (itensGame[0].classList.contains('clicado2') && itensGame[1].classList.contains('clicado2') && itensGame[2].classList.contains('clicado2')
        || itensGame[3].classList.contains('clicado2') && itensGame[4].classList.contains('clicado2') && itensGame[5].classList.contains('clicado2')
        || itensGame[6].classList.contains('clicado2') && itensGame[7].classList.contains('clicado2') && itensGame[8].classList.contains('clicado2')
        || itensGame[0].classList.contains('clicado2') && itensGame[3].classList.contains('clicado2') && itensGame[6].classList.contains('clicado2')
        || itensGame[1].classList.contains('clicado2') && itensGame[4].classList.contains('clicado2') && itensGame[7].classList.contains('clicado2')
        || itensGame[2].classList.contains('clicado2') && itensGame[5].classList.contains('clicado2') && itensGame[8].classList.contains('clicado2')
        || itensGame[0].classList.contains('clicado2') && itensGame[4].classList.contains('clicado2') && itensGame[8].classList.contains('clicado2')
        || itensGame[2].classList.contains('clicado2') && itensGame[4].classList.contains('clicado2') && itensGame[6].classList.contains('clicado2')) {

        resultado = 'Jogador2'
        ganhador(resultado)
    }


    else {
        if (itensGame[0].classList.contains('clicado') && itensGame[1].classList.contains('clicado') && itensGame[2].classList.contains('clicado')
            && itensGame[3].classList.contains('clicado') && itensGame[4].classList.contains('clicado') && itensGame[5].classList.contains('clicado')
            && itensGame[6].classList.contains('clicado') && itensGame[7].classList.contains('clicado') && itensGame[8].classList.contains('clicado')) {

            resultado = 'Velha'
            ganhador(resultado)
        }
    }
}




const popUp = document.querySelector('.pop-up')
const g = document.querySelector('.g')
const img = document.querySelector('.img-pop')
const box = document.querySelector('.box-container')


function ganhador(resultado) {
    popUp.style.display = 'block'
    box.style.display = 'none'

    if (resultado == 'Jogador1') {
        g.innerText = `JOGADOR 1 GANHOU!`
    }

    else if (resultado == 'Jogador2'){
        g.innerText = `JOGADOR 2 GANHOU!`
    }
    
    else{
        img.src = '/img/emoji.png'
        g.innerText = `DEU VELHA!`
    }

    socket.emit('vencedor', resultado);
}


for (c = 0; c < 9; c++) {
    itensGame[c].addEventListener('click', verificar)
}
