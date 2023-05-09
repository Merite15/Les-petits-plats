import * as cards from "./displayCards.js";
import * as filters from "./displayFilters.js";
import { showListOfTags, tagsArray } from "./displayTags.js";
import { isFilterReload } from "./openCloseFilters.js";
import { deleteDuplicatesGoogled, toLowercase } from "./utils.js";

export let searchRecipe = (recipes, searchText) => {
  let searchedCards = [];

  const lowTextSearch = toLowercase(searchText);

  for (let recipe of recipes) {
    if (
      // une recette ?
      recipe.name.toLowerCase().trim().indexOf(lowTextSearch) > -1 ||
      recipe.description.toLowerCase().trim().indexOf(lowTextSearch) > -1
    ) {
      searchedCards.push(recipe);

      continue;
    }

    // un ingredient ?
    for (let ingredient of recipe.ingredients) {
      if (
        ingredient.ingredient
          .toLowerCase()
          .trim()
          .indexOf(lowTextSearch) > -1
      ) {
        searchedCards.push(recipe);
        break;
      }
    }
  }
  return searchedCards;
};

// Barre de recherche
export let IS_SEARCHED = (recipes) => {
  const takeIt = document.querySelector(".recipe-search__input");

  takeIt.addEventListener("input", () => {
    // si le nombre de lettre dépasse 2 alors :  LANCER ALGO
    if (takeIt.value.length > 2) {
      const searchedRecipes = searchRecipe(recipes, takeIt.value);
      const searchedRecipesDistinct = deleteDuplicatesGoogled(searchedRecipes);
      cards.DISPLAY_CARDS(searchedRecipesDistinct);
      filters.DISPLAY_FILTERS(searchedRecipesDistinct);
      isFilterReload(recipes);
    } else {
      // SINON TABLEAU DES RECETTES
      cards.DISPLAY_CARDS(recipes);
      isFilterReload(recipes);

      while (tagsArray.length > 0) {
        tagsArray.pop();
      }

      showListOfTags(tagsArray);

      document.querySelectorAll(".filter__custom-option").forEach((li) => {
        li.classList.add("filter__custom-option");
        li.classList.remove("filter__custom-option--enable");
      });
    }
  });
};

// Liste des filtres
export let IS_TAGGED = (recipes) => {
  // Recherche sur un filtre
  const takeFilter = document.querySelectorAll(".filter__select");

  takeFilter.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Tableau des tags
      while (tagsArray.length > 0) {
        tagsArray.pop();
      }

      showListOfTags(tagsArray);
      cards.DISPLAY_CARDS(recipes);

      let value = input.getAttribute("data-value");
      let color = input.getAttribute("data-color");

      input.nextElementSibling.remove();

      filters.DISPLAY_FILTERS(recipes, input, input.value, value, color);
      input.parentNode.style.width = "66%";
      input.setAttribute("placeholder", "Recherche un ingrédient");
      input.nextElementSibling.classList.add("filter__show");
      input.previousElementSibling.classList.add(
        "filter__custom-arrow--rotate"
      );
    });
  });
};
