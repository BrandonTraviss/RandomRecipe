import renderMeal from "./getRandomMeal.js";

const mainDiv = document.getElementById("meal-main-div")
const nextButton = document.getElementById("next-recipe")



window.addEventListener("load", async (event) => {
    nextButton.addEventListener('click', async () => {
        renderMeal()
    })
    renderMeal()
});


