import * as model from "./model";
import { MODAL_CLOSE_SEC } from "./config";
import recipeView from './view/recipeView';
import SearchView from "./view/SearchView";
import resultsView from "./view/resultsView";
import paginationView from "./view/paginationView";
import bookmarksView from "./view/bookmarksView";
import addRecipeView from "./view/addRecipeView";

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from "regenerator-runtime";
import View from "./view/view";



const controlRecipe = async function () {
  
  // 1  Making Recipe Api call
    try {
      const id = window.location.hash.slice(1);
      // console.log(id)

      if(!id) return;
      // render spinner
      recipeView.renderSpinner();

      // update results view to mark selected search results
        resultsView.update(model.getSearchResultsPage());
      // update bookmarks view to be selected
      bookmarksView.update(model.state.bookmarks);

      
      // render recipe
      await model.loadRecipe(id);
      recipeView.render(model.state.recipe);

    } catch (error) {
            alert(error);
            recipeView.renderError();
    }
};

const controlSearchResult = async function () {
  try {

    resultsView.renderSpinner();
    
    //1) Get search query
    const query = SearchView.getInputValue();

    if (!query) return;

    // 2)Load search results
    await model.loadSearchResult(query);

    // 3)Render Results
    // console.log(model.state.search.results);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // render pagination buttons
    paginationView.render(model.state.search);


  } catch (error) {
      console.log("eroooooooooor ====== >",error);
  }
}

const controlPagination = function (gotoPage) {

    //Render Results
    resultsView.render(model.getSearchResultsPage(gotoPage));

    // render pagination buttons
    paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // update servings in model.state
  model.updateServings(newServings);
  // update servings and quantity in recipeview

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
    // 1)add bookmarks
  if(!model.state.recipe.bookmarked === true){
    model.addBookmark(model.state.recipe);

    // 2)delete bookmark
  }else { model.deleteBookmark(model.state.recipe.id)  }

  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlStorageBookmarks  = function () {
    bookmarksView.render(model.state.bookmarks);
}

const controlUpload = async function (newRecipe) {
  try {
    // show the loading spinner
    addRecipeView.renderSpinner();

    // upload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);


    // show the created recipe
    recipeView.render(model.state.recipe);
    
     // show success message
    addRecipeView.renderMessage();

    // render bookmarkView
    bookmarksView.render(model.state.bookmarks);

    // change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close the upload window
    setTimeout(function () {
        addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC * 1000);
    
  } catch (error) {
    console.log(error);
      addRecipeView.renderError(error.message);
  }
}

const init = function (){
  bookmarksView.addHandlerBookmarks(controlStorageBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addSearchHandler(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlUpload);
};
init();