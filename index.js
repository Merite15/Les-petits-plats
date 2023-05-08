import { renderRecipes } from "./JS/api.js";
import * as cards from "./JS/displayCards.js";
import * as filters from "./JS/displayFilters.js";
import * as closeFilters from "./JS/openCloseFilters.js";
import * as searchRecipe from "./JS/searchRecipe.js";

// RÉCUPÈRE LA DATA ET HYDRATE LES COMPOSANTS
export const GET_RECIPES_HYDRATE = (renderRecipes.prototype.getAllRecipes =
  function (recipes) {
    cards.DISPLAY_CARDS(recipes);
    filters.DISPLAY_FILTERS(recipes);
    searchRecipe.IS_SEARCHED(recipes);
    searchRecipe.IS_TAGGED(recipes);
    return recipes;
  });

// ASSURE L'OUVERTURE ET LA FERMETURE DES FILTRES
let buttons = document.querySelectorAll(".filter__select");
let buttonValue;
buttons.forEach((btn) => {
  // OPEN CLOSE FILTER
  btn.addEventListener("click", () => {
    buttonValue = btn.getAttribute("value");
    closeFilters.isFiltersInteractive(btn, buttonValue);
  });
});

// clear input after reload
window.onload = function () {
  document.querySelector(".recipe-search__input").value = "";
};
