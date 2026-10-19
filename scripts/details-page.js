"use strict";

import { getIngredientsArray, getInstructionsArray } from "./utils.js";
import { getMeal, getRandomMeal } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const imageContainer = document.getElementById("image");
const badgesContainer = document.getElementById("badges-meal-detail");
const mealNameH1 = document.querySelector("h1");
const buttonsContainer = document.getElementById("buttons-detail");
const buttonOther = document.getElementById("other");
const ingredientsElement = document.getElementById("ingredients");
const instructionsElement = document.getElementById("instructions");
const backBtn = document.getElementById("back-btn");

document.addEventListener("DOMContentLoaded", async () => {
  const meal = await getMeal(id);
  const ingredients = getIngredientsArray(meal);
  const instructions = getInstructionsArray(meal[0].strInstructions);

  backBtn.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  buttonOther.addEventListener("click", async () => {
    const rnd = await getRandomMeal();
    window.location.href = "./details-page.html?id=" + rnd[0].idMeal;
  });

  const mealData = meal[0];

  const image = document.createElement("img");
  image.src = mealData.strMealThumb + "/large";
  image.alt = mealData.strMeal;
  imageContainer.append(image);

  const liCountry = document.createElement("li");
  const liCategory = document.createElement("li");
  liCountry.textContent = mealData.strCountry;
  liCategory.textContent = mealData.strCategory;
  badgesContainer.append(liCountry);
  badgesContainer.append(liCategory);

  mealNameH1.textContent = mealData.strMeal;

  if (mealData.strYoutube) {
    const videoBtn = document.createElement("a");
    videoBtn.id = "video-btn";
    videoBtn.textContent = "Video ansehen";

    videoBtn.href = mealData.strYoutube;
    videoBtn.target = "_blank";

    buttonsContainer.insertBefore(videoBtn, buttonOther);
  }

  ingredients.forEach((i, index) => {
    const ingredient = document.createElement("div");
    ingredient.classList.add("ingredient");
    const ingName = document.createElement("span");
    const ingMeasure = document.createElement("span");

    ingName.textContent = ingredients[index]["strIngredient" + (index + 1)];
    ingMeasure.textContent = i.value;

    ingredient.append(ingName);
    ingredient.append(ingMeasure);
    ingredientsElement.append(document.createElement("hr"));
    ingredientsElement.append(ingredient);
  });

  for (let i = 0; i < instructions.length - 1; i++) {
    const instructionStep = document.createElement("div");
    const instructionStepNumber = document.createElement("div");
    const instruction = document.createElement("span");
    instructionStepNumber.classList.add("number");
    instructionStepNumber.textContent = i + 1;
    instruction.classList.add("instruction");
    instruction.textContent = instructions[i];

    instructionStep.append(instructionStepNumber);
    instructionStep.append(instruction);

    instructionsElement.append(instructionStep);
  }
});
