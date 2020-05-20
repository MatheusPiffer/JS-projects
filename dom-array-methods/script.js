const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sort = document.getElementById('sort')
const calculateWealth = document.getElementById('calculate-wealth')


let data = [];
getRamdomUser()
function wealthCalculated() {
    const wealth = data.reduce((acc, user) => 
        (acc += user.money), 0)
    console.log(wealth)

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
}
function onlyMillionaires() {
    data = data.filter(user => {
        return user.money > 1000000
    })
    updateDOM()
    wealthCalculated()
}
function sortByRichest() {
    data = data.sort((a, b) => {
        return b.money - a.money
    })

    updateDOM()
    wealthCalculated()
}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDOM()
    wealthCalculated()
}
async function getRamdomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    const user = data.results[0]
    const newUser = {
        name: user.name.first + ' ' + user.name.last,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser)
}

function addData(obj) {
    data.push(obj)
    updateDOM()
    wealthCalculated()
}

function updateDOM(providedData = data) {
    console.log(main)
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'
    providedData.forEach(person => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${person.name}</strong>${formatMoney(person.money)}`
        main.appendChild(element)
    })

}

function formatMoney(money) {
    return '$' + money.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

}

addUser.addEventListener('click', getRamdomUser)
double.addEventListener('click', doubleMoney)
sort.addEventListener('click', sortByRichest)
showMillionaires.addEventListener('click', onlyMillionaires)
calculateWealth.addEventListener('click', wealthCalculated)