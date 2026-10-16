"use strict";

import { getIngredientsArray, getInstructionsArray } from "./utils.js";
import { getMealData } from "./api.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getMeal = async () => {
  const meal = await getMealData(id);
  return meal;
};

const imageContainer = document.getElementById("image");
const badgesContainer = document.getElementById("badges-meal-detail");
const mealNameH1 = document.querySelector("h1");
const videoButton = document.getElementById("video-btn");
const ingredientsElement = document.getElementById("ingredients");
const instructionsElement = document.getElementById("instructions");

document.addEventListener("DOMContentLoaded", async () => {
  const meal = await getMeal();
  console.log(meal);
  const ingredients = getIngredientsArray(meal);
  const instructions = getInstructionsArray(meal.meals[0].strInstructions);

  const mealData = meal.meals[0];

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

  videoButton.href = mealData.strYoutube;
  videoButton.target = "_blank";

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
    instruction.textContent = instructions[i];

    instructionStep.append(instructionStepNumber);
    instructionStep.append(instruction);

    instructionsElement.append(instructionStep);
  }
});
