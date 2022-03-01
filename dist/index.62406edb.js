const recipeContainer = document.querySelector(".recipe");
// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };
// Api to use to build this applications
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// async functions will awlways a promise
// we should always start an async function with try and catch block
// Loading recipe data from the Api
const showRecipe = async function() {
    try {
        // 1) Loading Recipe
        const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca3b?key=<insert your key>");
        const data = await response.json();
        // if response is not ok
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);
        let { recipe  } = data.data;
        console.log(recipe);
        let myRecipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
            image: recipe.image_url,
            sourceUrl: recipe.source_url
        };
        console.log(myRecipe);
        // 2) Rendering recipe
        const markup = `
      <figure class="recipe__fig">
        <img src="${myRecipe.image}" alt="${myRecipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${myRecipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${myRecipe.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${myRecipe.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${// we want to return all the li items together as a huge html file
        // so we are going to join the array that gets returned in the end to get
        // all the li items together
        myRecipe.ingredients.map((ingredient)=>{
            return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ingredient.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit}</span>
              ${ingredient.description}
            </div>
          </li>
          `;
        }).join("")}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${myRecipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${myRecipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>    
    `;
        // clear the recipe container before we add a recipe with its details
        recipeContainer.innerHTML = "";
        // Insert html to the dom , to the parent element
        recipeContainer.insertAdjacentHTML("afterbegin", markup);
    } catch (err) {
        console.log(err);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
