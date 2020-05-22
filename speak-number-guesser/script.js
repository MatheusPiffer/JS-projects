const msgEl = document.getElementById('msg')

const randomNum = getRandomNumber()
console.log(randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new window.SpeechRecognition()
recognition.start()

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

function onSpeak(e) {
    const msg = e.results[0][0].transcript
    writeMessage(msg)
    checkNumber(msg)
}

function checkNumber(msg) {
    const num = +msg
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>Não é um número válido</div>`
        return
    }
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Número deve estar entre 1 e 100</div>'
        return
    }
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>
            Parabéns! Você advinhou o número!<br><br>
            Era ${num}
        </h2>
        <button class="play-again" id="play-again" onclick="window.location.reload()">Advinhar novamente</button>`
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div> PARA BAIXO</div>`
    } else {
        msgEl.innerHTML += '<div>PARA CIMA</div>'
    }
}

function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>Você disse:</div>
    <span class="box">${msg}</span>`
}

recognition.addEventListener('result', onSpeak)
recognition.addEventListener('end', () => recognition.start())
