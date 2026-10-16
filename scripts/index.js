"use strict";

import { getCategoriesData, getMealsData } from "./api.js";

const categoriesElement = document.getElementById("categories");
const categoriesElementoLoop = document.querySelectorAll("#categories");
const mealCardsElement = document.getElementById("meal-cards");

const getCategories = async () => {
  const categories = await getCategoriesData();
  return categories.categories;
};

const getMeals = async () => {
  const meals = await getMealsData();
  console.log(meals.meals);
  return meals.meals;
};

document.addEventListener("DOMContentLoaded", async () => {
  const categories = await getCategories();
  categories.unshift({ strCategory: "Alle" });
  categories.sort((a, b) => a.strCategory - b.strCategory);
  categories.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = c.strCategory;
    categoriesElement.append(li);
  });

  categoriesElementoLoop.forEach((ce) => {
    ce.addEventListener("click", () => {
      console.log(ce.children.children); // why undefined?
      ce.children.children.classList.add("active");
    });
  });

  const meals = await getMeals();

  meals.forEach((m) => {
    const img = document.createElement("img");
    const a = document.createElement("a");
    const badgeContainer = document.createElement("div");
    const liCategory = document.createElement("li");
    const liCountry = document.createElement("li");
    const mealName = document.createElement("h3");
    const cta = document.createElement("span");

    liCategory.textContent = m.strCategory;
    liCountry.textContent = m.strCountry;
    badgeContainer.classList.add("badge-container");
    badgeContainer.append(liCategory);
    badgeContainer.append(liCountry);

    a.classList.add("meal-card");
    img.src = m.strMealThumb + "/medium";
    img.alt = m.strMeal;

    mealName.textContent = m.strMeal;

    cta.textContent = "Rezept ansehen";

    a.append(img);
    a.append(badgeContainer);
    a.append(mealName);
    a.append(cta);

    a.href = "./details-page.html?id=" + m.idMeal;
    a.title = m.strMeal;

    mealCardsElement.append(a);
  });
});
