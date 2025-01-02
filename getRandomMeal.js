

//MainDiv
const mainDiv = document.getElementById("meal-main-div")
//Ingredients/Measurements Container
const ingredientsMeasurementsContainer = document.createElement('div')
//Ingredients Div
const ingredientsDiv = document.createElement('div')
//Measurements Div
const measurementsDiv = document.createElement('div')
// Link Container
const linkContainer = document.createElement('div')
linkContainer.classList.add("link-container")
//Clear DOM function
function clearDom() {
    mainDiv.innerHTML = " "
    linkContainer.innerHTML = ""
    ingredientsMeasurementsContainer.innerHTML = ""
    ingredientsDiv.innerHTML = ""
    measurementsDiv.innerHTML = ""
}
export default async function renderMeal() {
    //Clear Dom
    clearDom()
    //Get Data from API
    const data = await getRandomMeal()
    //ParseData
    const meal = parseData(data)
    console.log(meal, "Data to use")
    //Create Elements for DOM render
    //Setup Image
    const mealImg = document.createElement('img')
    mealImg.src = meal.image
    mealImg.classList.add('main-image')
    //Setup Dish Name
    const mealName = document.createElement('p')
    mealName.innerText = meal.name
    mealName.classList.add('meal-name')
    //Setup Country of origin
    const mealEthnicity = document.createElement('p')
    mealEthnicity.innerText = `Ethnicity : ${meal.ethnicity}`
    //Image/Name/Ethnicity
    mainDiv.appendChild(mealImg)
    mainDiv.appendChild(mealName)
    mainDiv.appendChild(mealEthnicity)
    //Create and append Ingredients and Measurements to respetive containers
    ingredientsMeasurementsContainer.classList.add('ingredient-measurement-container')
    meal.ingredients.forEach(ingredient => {

        let ingredientContents = document.createElement('p')
        ingredientContents.innerText = ingredient
        ingredientsDiv.appendChild(ingredientContents)

    })
    meal.measurements.forEach(measurement => {
        let measurementContents = document.createElement('p')
        measurementContents.innerText = measurement
        measurementsDiv.appendChild(measurementContents)

    })
    //Setup instructions
    const instructionsText = document.createElement('p')
    instructionsText.innerHTML = meal.instructions
    instructionsText.classList.add('instructions-text')
    //Append Ingredients and Measurements to container
    ingredientsMeasurementsContainer.appendChild(ingredientsDiv)
    ingredientsMeasurementsContainer.appendChild(measurementsDiv)
    //Append Container to main Div
    mainDiv.appendChild(ingredientsMeasurementsContainer)
    //Append instructions
    mainDiv.appendChild(instructionsText)
    //Setup Links
    const sourceLink = document.createElement('a')
    const youtubeLink = document.createElement('a')

    if (meal.sourceUrl != "" | meal.sourceUrl != null) {
        sourceLink.href = meal.sourceUrl
        sourceLink.innerText = "Source"
        sourceLink.classList.add('source-link')
        sourceLink.target = "_blank"
        linkContainer.appendChild(sourceLink)
    }

    if (meal.youtube != "" | meal.youtube != null) {
        youtubeLink.href = meal.youtube
        linkContainer.appendChild(youtubeLink)
        youtubeLink.classList.add('youtube-link')
        youtubeLink.target = "_blank"
        youtubeLink.innerText = "Youtube"
    }

    sourceLink.href = meal.sourceUrl
    youtubeLink.href = meal.youtube
    //Append Links to container
    //Append linkContainer
    mainDiv.appendChild(linkContainer)
}

function parseData(data) {
    console.log(data)
    const mealData = {
        id: data.idMeal,
        name: data.strMeal,
        image: data.strMealThumb,
        ethnicity: data.strArea,
        category: data.strCategory,
        ingredients: [],
        measurements: [],
        instructions: data.strInstructions,
        sourceUrl: data.strSource,
        youtube: data.strYoutube

    }

    for (let i = 1; i <= 20; i++) {
        let ingredient = data[`strIngredient${i}`];
        let measurement = data[`strMeasure${i}`]
        if (ingredient != "") {
            mealData.ingredients.push(ingredient);
            mealData.measurements.push(measurement);
        }
    }
    return mealData
}

async function getRandomMeal() {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json.meals[0]
    } catch (error) {
        console.error(error.message);
    }
}
