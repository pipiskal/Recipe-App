import icons from "url:../../img/icons.svg"; //Parcel 2

export default class View {
  _data;
  render(data) {
    // we get the data from the controller when its loading with await
    this._data = data;
    // Loading the spinner before we render any data
    const spinner = this._generateSpinner();
    this._parentElement.insertAdjacentHTML("afterbegin", spinner);
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateSpinner() {
    this._clear();
    return `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;
  }

  renderError(message = this._errorMessage) {
    this._clear();
    const markup = `
    <div class="error">
        <div>
            <svg>
            <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>
      `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this.successMessage) {
    this._clear();
    const markup = `
    <div class="error">
        <div>
            <svg>
            <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>
      `;

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
