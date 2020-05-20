const cardContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

let currentActiveCard = 0

const cardsEl = []
const cardsData = getCardsData()
// const cardsData = [
//     {
//         question: 'What must a variable begin with ?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable ?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Exemplo of case sensetive Variable ?',
//         answer: 'thisIsVariable'
//     }
// ]


function createCards() {
    cardsData.forEach((data, index) => createCard(data, index))
}

function createCard(data, index) {
    const card = document.createElement('div')
    card.classList.add('card')
    if (index === 0) {
        card.classList.add('active')
    }
    card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>`
    card.addEventListener('click', () => card.classList.toggle('show-answer'))
    cardsEl.push(card)
    cardContainer.appendChild(card)
    updateCurrentText()
}

function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1} / ${cardsData.length}`
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

function setCardsData(cards){
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}

createCards()

nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left'
    currentActiveCard = currentActiveCard + 1
    if (currentActiveCard > cardsData.length - 1) {
        currentActiveCard = cardsData.length - 1
    }
    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
})
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right'
    currentActiveCard = currentActiveCard - 1
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }
    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
})

showBtn.addEventListener('click', () => {
    addContainer.classList.add('show')
})
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show')
})

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value
    if(question.trim() === '' || answer.trim() === ''){
        alert('Question and answer required')
    } else {
        const newCard = {question, answer}
        createCard(newCard)
        questionEl.value = ''
        answerEl.value = ''
        addContainer.classList.remove('show')
        cardsData.push(newCard)
        setCardsData(cardsData)
    }
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    cardContainer.innerHTML = ''
    window.location.reload()
})