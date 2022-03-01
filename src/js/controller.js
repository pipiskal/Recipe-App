// default import we name it to icons
// import icons from "../img/icons.svg"; //Parcel 1
import * as model from "./model.js";
// recipeView Here is an object of the class RecipeView,
// if we had to export the whole class to create an object
// We would have to do something like that
// const recipeView = new RecipeView(data)  ---> and provide the data to the constructor
import recipeView from "./views/recipeView.js";
// polyfiling everything else
import "core-js/stable";
// polyfiling async await for old browser
import "regenerator-runtime/runtime";

// async functions will awlways a promise
// we should always start an async function with try and catch block

// Loading recipe data from the Api
const showRecipe = async function () {
  try {
    // getting the hash id from the global location of the window
    // hash id comes like that #5ed6604591c37cdc054bca57 --> so we need to remove the #
    // so we slice it
    const hashId = window.location.hash.slice(1);
    // guard close , simply return and dont do anything below if we have not hashId
    if (!hashId) return;
    // 1) Loading recipe from model module, we need to await cause its An async function
    await model.loadRecipe(hashId);
    // When its done the state object in the model.js file will be ready to be used
    // getting the data out of the state object that we have access from model module
    const { myRecipe } = model.state;
    // 2) Rendering recipe
    recipeView.render(myRecipe);
  } catch (error) {
    recipeView.renderError();
  }
};

// Lets listen for an event when hash is changing on window level
// Publisher --- Subscriber pattern
const init = function () {
  recipeView.addHandlerRender(showRecipe);
  showRecipe();
};

const controlSearchResults = async function () {
  try {
    await model.loadSearchResults("pizza");

    console.log(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

controlSearchResults();

init();
