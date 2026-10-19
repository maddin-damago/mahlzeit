"use strict";

export function getIngredientsArray(meal) {
  const ingredients = [];
  const measures = [];

  const maxNumberIngredients = Object.keys(meal[0]).filter((e) =>
    e.includes("Ingredient"),
  );

  const flatenned = Array.from(maxNumberIngredients, (_, index) => {
    return {
      name: meal[0][`strIngredient${index + 1}`],
      measure: meal[0][`strMeasure${index + 1}`],
    };
  }).filter((ingredient) => ingredient.name);

  console.log(flatenned);

  meal.forEach((m) => {
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

  meal.forEach((m) => {
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
