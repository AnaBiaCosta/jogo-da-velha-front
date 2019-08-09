// ENTRAR E SAIR
function ir() {
    window.location = "game.html"
}


const r = document.querySelector('.restart')
r.addEventListener('click', restart)

function restart() {
    window.location = 'game.html'
}


// COMEÇO DO JOGO
const socket = io('http://localhost:3000')

socket.on('connect', function () { })
socket.on('event', function (data) { })
socket.on('disconnect', function () { })



let bloqueado = false
let firstPlay = false


// VERIFICANDO A JOGADA
let jogada = 0
const itensGame = document.querySelectorAll('.box-item')


function verificar(event) {
    const element = event.target.querySelector('img')
    const div = element.closest('.box-item')



    if (firstPlay === false) {
        firstPlay = true
    }


    if (bloqueado) {
        alert('Não é sua vez! Não tente roubar!')
        return
    }


    if (jogada > 8) {
        alert('O Jogo Acabou!!!!')
    }

    if (div.classList.contains("clicado")) {
        alert('Você está tentando roubar?!! Que feio...')
    } else {
        const imagem = (jogada % 2) ? 'jogador2' : 'jogador1'

        if (imagem == 'jogador1') {
            div.classList.add("clicado1")
            socket.emit('chat message', { "jogador": "jogador1", "posicao": element.getAttribute('data-index') })
        } else {
            div.classList.add("clicado2")
            socket.emit('chat message', { "jogador": "jogador2", "posicao": element.getAttribute('data-index') });
        }
    }
}


// CONTA A JOGADA E TROCA A IMAGEM
socket.on('chat message', function (msg) {
    jogada++
    console.log("firstPlay", firstPlay)
    console.log("bloqueado", bloqueado)
    
    if (firstPlay == true && bloqueado == false) {
        bloqueado = true
        firstPlay = null
    } else if(firstPlay == null && bloqueado == true) {
        bloqueado = false
    }

    console.log(msg)
    let element = document.querySelector(`[data-index='${msg.posicao}']`)
    element.setAttribute('src', '/img/' + msg.jogador + '.png')
    element.closest('span').classList.add("clicado")

    verificarVencedor()
})
socket.on('vencedor', function (msg) { console.log('O vencedor foi: ' + msg) })






// VERIFICANDO O GANHADOR
function verificarVencedor() {
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

for (c = 0; c < 9; c++) {
    itensGame[c].addEventListener('click', verificar)
}





// // FUNÇÃO DOS POP UP'S
const popUp = document.querySelector('.pop-up')
const g = document.querySelector('.g')
const img = document.querySelector('.img-pop')
const box = document.querySelector('.box-container')


function ganhador(resultado) {
    popUp.style.display = 'block'
    box.style.display = 'none'

    if (resultado == 'Jogador1') {
        g.innerText = `JOGADOR X GANHOU!`
    }

    else if (resultado == 'Jogador2') {
        g.innerText = `JOGADOR O GANHOU!`
    }

    else {
        img.src = '/img/emoji.png'
        g.innerText = `DEU VELHA!`
    }

    socket.emit('vencedor', resultado);
}




