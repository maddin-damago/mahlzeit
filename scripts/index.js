"use strict";

import {
  getCategoriesData,
  getMealsData,
  getMealsByCategoryData,
} from "./api.js";

const categoriesElement = document.getElementById("categories");
const mealCardsElement = document.getElementById("meal-cards");

const getCategories = async () => {
  const categories = await getCategoriesData();
  return categories.categories;
};

const getMeals = async () => {
  const meals = await getMealsData();
  return meals.meals;
};

const getMealsByCategory = async (category) => {
  const meals = await getMealsByCategoryData(category);
  return meals.meals;
};

document.addEventListener("DOMContentLoaded", async () => {
  const categories = await getCategories();
  categories.unshift({ strCategory: "Alle" });
  categories.sort((a, b) => a.strCategory - b.strCategory);
  categories.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = c.strCategory;
    if (c.strCategory === "Alle") {
      li.classList.add("active");
    }
    li.classList.add("filter");
    categoriesElement.append(li);
  });

  const categoriesElementsToLoop = document.querySelectorAll(".filter");
  let activeCategory = null; // "<li class='active filter'>Alle</li>"
  let selectedCategory = "Alle";
  categoriesElementsToLoop.forEach((ce) => {
    ce.addEventListener("click", (e) => {
      if (activeCategory) {
        activeCategory.classList.remove("active");
      }
      activeCategory = e.currentTarget;
      activeCategory.classList.add("active");
      selectedCategory = e.currentTarget.textContent;
    });
  });

  console.log(selectedCategory);
  const meals =
    selectedCategory === "Alle"
      ? await getMeals()
      : await getMealsByCategory(selectedCategory);

  console.log(meals);

  // put this into render method to call on all the dom changes
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
