"use strict";
import {
  urlMain,
  endpointSearchByName,
  endpointSearchById,
  endpointCategories,
  endpointFilterByCategory,
  endpointRandomMeal,
} from "./endpoints.js";

const getCategoriesData = async () => {
  const reponse = await fetch(`${urlMain}${endpointCategories}`);
  return reponse.json();
};

const getMealsData = async (mealsName = "a") => {
  const reponse = await fetch(`${urlMain}${endpointSearchByName}${mealsName}`);
  return reponse.json();
};

const getMealData = async (id) => {
  const response = await fetch(`${urlMain}${endpointSearchById}${id}`);
  return response.json();
};

const getMealsByCategoryData = async (category) => {
  const response = await fetch(
    `${urlMain}${endpointFilterByCategory}${category}`,
  );
  return response.json();
};

const getRandomMealData = async () => {
  const response = await fetch(`${urlMain}${endpointRandomMeal}`);
  return response.json();
};

export const getCategories = async () => {
  const categories = await getCategoriesData();
  return categories.categories;
};

export const getMeals = async (searchTerm) => {
  const meals = await getMealsData(searchTerm);
  return meals.meals;
};

export const getMeal = async (id) => {
  const meal = await getMealData(id);
  return meal.meals;
};

export const getMealsByCategory = async (category) => {
  const meals = await getMealsByCategoryData(category);
  return meals.meals;
};

export const getRandomMeal = async () => {
  const meals = await getRandomMealData();
  return meals.meals;
};
