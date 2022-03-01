import View from "./View.js";
import icons from "url:../../img/icons.svg"; //Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    this._clear();
    return this._data.map(this._renderPreview).join("");
  }

  _renderPreview(recipe) {
    return `
      <li class="preview">
            <a class="preview__link " href="#${recipe.id}">
            <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}Woman</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li>
      `;
  }
}

export default new ResultsView();
