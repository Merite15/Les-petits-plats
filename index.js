import { renderRecipes } from "./JS/api.js";
import * as cards from "./JS/displayCards.js";
import * as filters from "./JS/displayFilters.js";
import * as displayFilters from "./JS/openCloseFilters.js";
import * as searchRecipe from "./JS/searchRecipe.js";

// Récupère les données et les transmettre dans les composants
export const GET_RECIPES = (renderRecipes.prototype.getAllRecipes =
  function (recipes) {
    cards.DISPLAY_CARDS(recipes);
    filters.DISPLAY_FILTERS(recipes);
    searchRecipe.IS_SEARCHED(recipes);
    // recherche effectuée à partir d'un tag
    searchRecipe.IS_TAGGED(recipes);
    return recipes;
  });

// ASSURE L'OUVERTURE ET LA FERMETURE DES FILTRES
let buttons = document.querySelectorAll(".filter__select");

let buttonValue;
buttons.forEach((btn) => {
  // Fermer le filtre
  btn.addEventListener("click", () => {
    buttonValue = btn.getAttribute("value");
    displayFilters.isFiltersInteractive(btn, buttonValue);
  });
});

// Effacer l'entrée après le rechargement
window.onload = function () {
  document.querySelector(".recipe-search__input").value = '';
}

