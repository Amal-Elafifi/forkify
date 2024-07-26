import icons from "url:../../img/icons.svg";
export default class View {
    _data;
    
    render(data, render = true){
        if(!data || (Array.isArray(data) && data.length === 0)){
            //  this._parentElement.innerHTML = ''; 
             return this.renderError();
           } 
                
           
        this._data = data;
        const markUp = this._generateMarkup();


        if(!render) return markUp;

        this._clear();

        this._parentElement.insertAdjacentHTML("afterbegin", markUp);
    } 
    update (data) {
     
      this._data = data;
      const newMarkUp = this._generateMarkup();
 
      const newDom = document.createRange().createContextualFragment(newMarkUp);
      const newElements =Array.from(newDom.querySelectorAll("*"));
      const curElements =Array.from(this._parentElement.querySelectorAll("*"));

      // update text of of curElements 
      newElements.forEach((newEle, i) =>{
        const curEle = curElements[i];

        if(!newEle.isEqualNode(curEle) &&
           newEle.firstChild?.nodeValue.trim() !== ''){
              curEle.textContent = newEle.textContent;
           }
      // update value of curElements attributes
        if(!newEle.isEqualNode(curEle)) {
          Array.from(newEle.attributes).forEach(attr => curEle.setAttribute(attr.name, attr.value));
        }
      }) ;    

    }

    _clear () {
        this._parentElement.textContent = '';
    }
    renderError (message = this._errorMessage) {
        const markUp =
        `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markUp);
    }
    renderMessage (message = this._message) {
        const markUp =
        `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }
    renderSpinner () {
        // loading spinner
        const markUp = `
        <div class="spinner">
             <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
     `;
     this._clear();
     this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    }

}