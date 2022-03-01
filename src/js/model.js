import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  myRecipe: {},
  search: {
    query: "",
    results: [],
  },
};

// when loadRecipe runs it will update the data inside the state object
// and set data to the myRecipe object as well

// Load Recipe here is not A PURE Function it has side effects
// cause it manipulates an object outside of its scope
export const loadRecipe = async function (hashId) {
  // 1) Loading Recipe
  try {
    let { data } = await getJSON(`${API_URL}${hashId}`);
    const recipe = data.recipe;

    state.myRecipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
    };
  } catch (error) {
    throw error;
  }
};

// againt his function manipulates the state and loads data to the search object
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
