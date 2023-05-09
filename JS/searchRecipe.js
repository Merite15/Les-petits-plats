import * as cards from "./displayCards.js";
import * as filters from "./displayFilters.js";
import { showListOfTags, tagsArray } from "./displayTags.js";
import { isFilterReload } from "./openCloseFilters.js";
import { removeDuplicatedSearch, toLowercase } from "./utils.js";

export let searchRecipe = (recipes, searchText) => {
  let searchCards = recipes.filter((recipe) => {
    const filterText = toLowercase(searchText);

    // Vérification du nom de la recette, de la description et de l'appareil
    const nameSearch = recipe.name.toLowerCase().includes(filterText);
    const descriptionSearch = recipe.description.toLowerCase().includes(filterText);

    // Vérification des ingrédients
    const ingredientMatching = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(filterText)
    );

    return nameSearch || descriptionSearch  || ingredientMatching;
  });

  return searchCards;
};

// Un élément present dans la barre de recherche
export let IS_SEARCHED = (recipes) => {
  const takeIt = document.querySelector(".recipe-search__input");

  takeIt.addEventListener("input", () => {
    // si le nombre de lettre dépasse 2 alors :  LANCER ALGO
    if (takeIt.value.length > 2) {
      const googledRecipes = searchRecipe(recipes, takeIt.value);
      const googledRecipesDistinct = removeDuplicatedSearch(googledRecipes);
      cards.DISPLAY_CARDS(googledRecipesDistinct);
      filters.DISPLAY_FILTERS(googledRecipesDistinct);
      isFilterReload(recipes);
    } else if (takeIt.value.length === 0  && 
      document.querySelectorAll(".filter__custom-option--enable").length === 0) { 
      // Réinitialiser la liste des ingrédients si le champ de recherche est vide
      cards.DISPLAY_CARDS(recipes);
      isFilterReload(recipes);
      // ON VIDE LE TABLEAU DES Tags
      while (tagsArray.length > 0) {
        tagsArray.pop();
      }
      showListOfTags(tagsArray);

      document.querySelectorAll(".filter__custom-option").forEach((li) => {
        li.classList.add("filter__custom-option");
        li.classList.remove("filter__custom-option--enable");
      });
    }  else {
      // SINON TABLEAU DES RECETTES
      cards.DISPLAY_CARDS(recipes);
      isFilterReload(recipes);
      // on vide me tableau des recipe-tags
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

// Recherche sur les filtres
export let IS_TAGGED = (recipes) => {
  // Barre de recherche des filtres
  const takeFilter = document.querySelectorAll(".filter__select");

  takeFilter.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Vider le tableau des tags
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
