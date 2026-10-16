"use strict";

import { urlMain, endpointSearchById } from "./data.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getMealData = async () => {
  const response = await fetch(`${urlMain}${endpointSearchById}${id}`);
  return response.json();
};

const getMeal = async () => {
  const meal = await getMealData();
  return meal;
};

document.addEventListener("DOMContentLoaded", async () => {
  const meal = await getMeal();

  const ingredients = [];
  const measures = [];

  meal.meals.forEach((m) => {
    for (const property in m) {
      let ingredient = {};
      if (property.includes("Ingredient")) {
        ingredient[property] = "";
        ingredients.push(ingredient);
      }
    }
  });

  meal.meals.forEach((m) => {
    for (const property in m) {
      if (property.includes("Measure")) {
        measures.push(m[property]);
      }
    }
  });

  for (let i = 0; i < ingredients.length; i++) {
    ingredients[i].value = measures[i];
  }
  console.log(ingredients);
});
