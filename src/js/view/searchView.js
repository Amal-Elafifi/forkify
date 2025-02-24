class SearchView {
   _parentEle = document.querySelector(".search");

   getInputValue () {
        const query = this._parentEle.querySelector(".search__field").value;
        this._clearInput();
        return query;
   }
    _clearInput () {
        this._parentEle.querySelector(".search__field").value = '';
    }
   addSearchHandler(handler) {
        this._parentEle.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        }) 
   }
}
export default new SearchView();