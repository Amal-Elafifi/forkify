import icons from "url:../../img/icons.svg";
import View from './view.js';

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick (handler){
         this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;

            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        })        
    }
    _generateMarkup() {
        const curPage = this._data.page;
        const alldataRes = this._data.results.length;
        const numPages = Math.ceil(alldataRes / this._data.resultsPerPage);

          // 1) between first and last pages , other pages
          if(curPage > 1 && curPage < numPages){
            return `
            <button data-goto= ${curPage - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>page ${curPage - 1}</span>
            </button>
            <button data-goto= ${curPage + 1} class="btn--inline pagination__btn--next">
                <span>Pag ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        };
        
        // 2)first page  , other pages
        if(curPage === 1 && numPages > 1){
            return `
                <button data-goto= "${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Pag ${curPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
        };
        // 3) last page , no other pages
        if(curPage === numPages && numPages > 1){
            return `
                <button data-goto= "${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>page ${curPage - 1}</span>
                </button>
            `;
        };

        // 4)first page , no other pages
            return ``;

    }

}

export default new paginationView();
