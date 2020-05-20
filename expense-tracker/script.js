const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTranscation = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 320 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ]

const localStoreTransaction = JSON.parse(localStorage.getItem('transaction'))


let transactions = JSON.parse(localStorage.getItem('transaction')) !== null ? localStoreTransaction : [] ;

function addTransaction(e) {
    e.preventDefault()
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Type a text and amount')
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        console.log(transaction)
        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        updateLocalStore()
        text.value = ''
        amount.value = ''
    }
}

function generateId() {
    return Math.floor(Math.random() * 1000000)
}
// Add transaction to DOM
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+'
    const item = document.createElement('li')
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    item.innerHTML = `
        ${transaction.text}<span>$${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `
    list.appendChild(item)
}

function deleteTransaction(id) {
    transactions = transactions.filter(item => item.id !== id)
    updateLocalStore()
    init()
}

function updateValues() {
    const amounts = transactions.map(transation =>
        transation.amount
    )
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)

    const expense = Math.abs(amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2))

    balance.innerText = `$${total}`
    money_plus.innerText = `+$${income}`
    money_minus.innerText = `-$${expense}`

}
function updateLocalStore(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
    updateValues()
}

function init() {
    list.innerHTML = ''
    transactions.forEach(addTransactionDOM)
    updateValues()
}

form.addEventListener('submit', addTransaction)

init()