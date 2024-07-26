import View from './view.js';
import previewView from './previewView.js';
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `This Recipe Is Not Valid Please Try Another One :)`;
    _message = '';

    _generateMarkup () {
        // console.log(this._data);
        return this._data.map(result => previewView.render(result, false)).join('');
        // console.log(this._data.map(bookmark => previewView.render(bookmark, false)).join(''))

    }   

}
export default new ResultsView();
