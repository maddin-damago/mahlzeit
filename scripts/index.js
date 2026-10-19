"use strict";

import { getCategories, getMeals, getMealsByCategory } from "./api.js";

const categoriesElement = document.getElementById("categories");
const mealCardsElement = document.getElementById("meal-cards");

document.addEventListener("DOMContentLoaded", async () => {
  const categories = await getCategories();

  renderMeals(getMeals);

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
  let activeCategory = document.querySelector("li.active.filter");
  categoriesElementsToLoop.forEach((ce) => {
    ce.addEventListener("click", (e) => {
      let selectedCategory = "Alle";
      if (activeCategory) {
        activeCategory.classList.remove("active");
      }
      activeCategory = e.currentTarget;
      activeCategory.classList.add("active");

      console.log(activeCategory);

      selectedCategory = e.currentTarget.textContent;
      console.log(selectedCategory);
      const meals =
        selectedCategory === "Alle"
          ? async () => await getMeals()
          : async () => await getMealsByCategory(selectedCategory);

      renderMeals(meals);
    });
  });
});

async function renderMeals(meals) {
  mealCardsElement.innerHTML = "";
  const currentMeals = await meals();

  currentMeals.forEach((m) => {
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
}
