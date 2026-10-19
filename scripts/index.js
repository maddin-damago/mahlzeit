"use strict";

import {
  getCategories,
  getMeals,
  getMealsByCategory,
  getRandomMeal,
} from "./api.js";

const categoriesElement = document.getElementById("categories");
const mealCardsElement = document.getElementById("meal-cards");
const searchFieldElement = document.getElementById("searchField");
const surpriseButton = document.getElementById("surprise-btn");

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

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  };

  const handleSearchInput = debounce((searchTerm) => {
    const mealsPromise = async () => getMeals(searchTerm);
    renderMeals(mealsPromise);
  }, 300);

  searchFieldElement.addEventListener("input", (e) => {
    const searchTerm = e.currentTarget.value;
    handleSearchInput(searchTerm);
  });

  surpriseButton.addEventListener("click", async () => {
    const rnd = await getRandomMeal();
    window.location.href = "./details-page.html?id=" + rnd[0].idMeal;
  });

  const categoriesElementsToLoop = document.querySelectorAll(".filter");
  let activeCategory = document.querySelector("li.active.filter");
  categoriesElementsToLoop.forEach((ce) => {
    ce.addEventListener("click", (e) => {
      let selectedCategory = e.currentTarget.textContent;
      if (activeCategory) {
        activeCategory.classList.remove("active");
      }
      activeCategory = e.currentTarget;
      activeCategory.classList.add("active");

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

  if (currentMeals) {
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
      if (m.strCategory) badgeContainer.append(liCategory);
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
  } else {
    const fallback = document.createElement("div");
    fallback.textContent = "Nothing found";
    fallback.classList.add("fallback");
    mealCardsElement.append(fallback);
  }
}
