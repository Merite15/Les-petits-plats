import * as cards from "./displayCards.js";
import * as filters from "./displayFilters.js";
import { showListOfTags, tagsArray } from "./displayTags.js";
import { isFilterReload } from "./openCloseFilters.js";
import { removeDuplicatedSearch } from "./utils.js";

export let searchRecipe = (recipes, filter) => {
  let searchCards = [];

  recipes.map((recipe) => {
    if (
      // une recette ?
      recipe.name.toLowerCase().trim().includes(filter.toLowerCase().trim()) ||
      recipe.description
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim()) ||
      // un appareil ?
      recipe.appliance
        .toLowerCase()
        .trim()
        .includes(filter.toLowerCase().trim())
    ) {
      searchCards.push(recipe);
    }

    // un ustensil ?
    recipe.ustensils.filter((elt) => {
      if (elt.toLowerCase().includes(filter.toLowerCase())) {
        searchCards.push(recipe);
      }
    });

    // un ingredient ?
    recipe.ingredients.map((ingredient) => {
      if (
        ingredient.ingredient
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim())
      ) {

        searchCards.push(recipe);
      }
    });
  });
  return searchCards;
};

// LISTEN INPUT BARRE DE RECHERCHE
export let IS_SEARCHED = (recipes) => {
  const takeIt = document.querySelector(".search__input");

  takeIt.addEventListener("input", () => {
    // si le nombre de lettre dépasse 2 alors :  LANCER ALGO
    if (takeIt.value.length > 2) {
      const googledRecipes = searchRecipe(recipes, takeIt.value);

      const googledRecipesDistinct = removeDuplicatedSearch(googledRecipes);

      cards.DISPLAY_CARDS(googledRecipesDistinct);

      filters.DISPLAY_FILTERS(googledRecipesDistinct);

      isFilterReload(recipes);
    } else {
      // SINON TABLEAU DES RECETTES
      cards.DISPLAY_CARDS(recipes);
      isFilterReload(recipes);
      // on vide me tableau des tags
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

// LISTEN FOREACH INPUT FILTER
export let IS_TAGGED = (recipes) => {
  // LISTEN INPUT BARRE DE RECHERCHE DU FILTRE
  const takeFilter = document.querySelectorAll(".filter__select");

  takeFilter.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // ON VIDE LE TABLEAU DES TAGS
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
