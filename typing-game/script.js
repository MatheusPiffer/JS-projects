const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

const words = [
    'sigh',
    'tense',
    'felicidade',
    'warlike',
    'highfalutin',
    'league',
    'football',
    'loving',
    'bad',
    'character',
    'feeble',
    'brazil',
    'tv',
    'desktop',
    'matheus'
];

// init word
let randomWord;
// init score
let score = 0
// init time
let time = 10

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'
difficultySelect.value = difficulty
let setTime = setInterval(updateTime, 1000)

text.focus()
function updateTime(){
    time --
    timeEl.innerText = time + 's'
    if(time === 0 ){
        clearInterval(setTime)
        gameOver()
    }
}

function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out - Game Over</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>`
    endgameEl.style.display = 'flex'
}
// Get random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

// add word to DOM 
function addWordToDom() {
    randomWord = getRandomWord()
    word.innerText = randomWord
}
function updateScore(){
    score++
    scoreEl.innerText = score
}

addWordToDom()

text.addEventListener('input', (e) => {
    const insertedText = e.target.value
    if (insertedText === randomWord){
        addWordToDom()
        updateScore()
     
        e.target.value = ''
        if(difficulty === 'hard') {
            time+= 2
        } else if (difficulty === 'medium'){
            time += 3
        } else {
            time+= 5
        }
        
        updateTime()
    }
})

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})

settingsForm.addEventListener('change', (e)=>{
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)

})



