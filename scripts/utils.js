"use strict";

export function getIngredientsArray(meal) {
  const ingredients = [];
  const measures = [];

  meal.meals.forEach((m) => {
    for (const property in m) {
      let ingredient = {};
      if (property.includes("Ingredient")) {
        if (m[property]) {
          ingredient[property] = m[property];
          ingredients.push(ingredient);
        }
      }
    }
  });

  meal.meals.forEach((m) => {
    for (const property in m) {
      if (property.includes("Measure") && m[property] !== " ") {
        measures.push(m[property]);
      }
    }
  });

  for (let i = 0; i < ingredients.length; i++) {
    ingredients[i].value = measures[i];
  }

  return ingredients;
}

export function getInstructionsArray(instructionsString) {
  const instructionsArray = instructionsString.split(".");
  return instructionsArray;
}
