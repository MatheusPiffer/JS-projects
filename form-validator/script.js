const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const username = document.getElementById('username');
const inputs = form.querySelectorAll('input')

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerHTML = message
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

function checkEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value)){
        showSuccess(input)
    } else{
        showError(input, 'Email is not valid')
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
function checkRequired(){
    inputs.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}


function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, 
            `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords does not match')
    }
}
//events listener
form.addEventListener('submit', function (e) {
    e.preventDefault()
    checkRequired()
    checkLength(username, 3, 15)
    checkLength(password, 6, 15)
    checkEmail(email)
    checkPasswordsMatch(password, password2)
})