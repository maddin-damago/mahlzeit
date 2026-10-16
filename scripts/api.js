"use strict";
import {
  urlMain,
  endpointSearchFirstLetter,
  endpointSearchById,
  endpointCategories,
  endpointFilterByCategory,
} from "./data.js";

export const getCategoriesData = async () => {
  const reponse = await fetch(`${urlMain}${endpointCategories}`);
  return reponse.json();
};

export const getMealsData = async (firstLetter = "a") => {
  const reponse = await fetch(
    `${urlMain}${endpointSearchFirstLetter}${firstLetter}`,
  );
  return reponse.json();
};

export const getMealData = async (id) => {
  const response = await fetch(`${urlMain}${endpointSearchById}${id}`);
  return response.json();
};

export const getMealsByCategoryData = async (category) => {
  const response = await fetch(
    `${urlMain}${endpointFilterByCategory}${category}`,
  );
  return response.json();
};
