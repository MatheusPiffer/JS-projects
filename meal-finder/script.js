const submit = document.getElementById('submit')
const random = document.getElementById('random')
const resultHeading = document.getElementById('result-heading')
const search = document.getElementById('search')
const mealsEl = document.getElementById('meals')
const singleMeal = document.getElementById('single-meal')


function getMeal(food) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results for '${food}'. Please try again!</p>`
            } else {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search results for '${food}':</h2>`
                mealsEl.innerHTML = data.meals.map(meal =>
                    `<div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>`
                ).join('')
            }
        })
}

function getMealById(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]
            openMealRecipe(meal)
        })
}

function getRandomMeal(){
    search.value = ''
    mealsEl.innerHTML = ''
    resultHeading.innerHTML = ''
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0]
        openMealRecipe(meal)
    })
}

function openMealRecipe(meal) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break
        }
    }
    console.log(ingredients)
    singleMeal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                ${ingredients.map(ing=>
                    `<li>${ing}</li>`
                ).join('')}
                </ul>
            </div>
        </div>`
}
function searchMeal(e) {
    e.preventDefault()
    if (search.value.trim()) {
        getMeal(search.value.trim())
    } else {
        resultHeading.innerHTML = `<p>Search a meal</p>`
    }
}

// add event listener
random.addEventListener('click', getRandomMeal)
submit.addEventListener('submit', searchMeal)
mealsEl.addEventListener('click', (e) => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    })
    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealid')
        getMealById(mealId)
    }

})
