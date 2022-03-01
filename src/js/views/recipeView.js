import View from "./View.js";
import icons from "url:../../img/icons.svg"; //Parcel 2
// we need to make sure that the icons gets loaded from the distribution folder
// so we import our icons and the parcel gets the job done
import { Fraction } from "fractional";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try again";
  _successMessage = "Search completed successfully";

  // if we used a construct we would have to privide the data
  // when creating the object but we dont know it yet
  // so we use a render method to get the data to work with from the controller.

  _generateMarkup() {
    this._clear();
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${
        // we want to return all the li items together as a huge html file
        // so we are going to join the array that gets returned in the end to get
        // all the li items together
        this._data.ingredients.map(this._generateIngredient).join("")
      }
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this._data.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>    
  `;
  }

  _generateIngredient(ingredient) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="src/img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ""
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
    `;
  }

  addHandlerRender(handler) {
    // Instead of having multiple event listeners
    // We create an array with the events and loop and add them to the EventListener.
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
}

// There is no reason to export the class so other modules will have access
// to the data of the class , We can export a RecipeView object

// this exports an object
export default new RecipeView();
