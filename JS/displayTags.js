import * as cards from "./displayCards.js";
import { searchRecipe } from "./searchRecipe.js";
import { isFilterReload } from "./openCloseFilters.js";
import { removeDuplicatedSearch, windowLocationReload } from "./utils.js";
import { DISPLAY_CARDS } from "./displayCards.js";

var originalRecipes = [];
var distinctFilteredRecipes = [];

export var tagsArray = [
];

// LISTER LES TAGS
const listenToTags = function (data) {
  document.querySelectorAll(".tags__close").forEach((X) => {
    X.addEventListener("click", tagIsNone);
  });
};

const tagIsNone = (e) => {
  let ID = e.currentTarget.id;

  ID = parseInt(ID);
  tagsArray.splice(ID, 1);

  if (tagsArray.length === 0) {
    DISPLAY_CARDS(originalRecipes[0]);
    isFilterReload(originalRecipes[0]);
  } else if (tagsArray.length >= 1) {
    let tagReload = [];
    tagReload.push(originalRecipes[0]);
    tagsArray.forEach((item) => {
      let distinctFilteredRecipes = removeDuplicatedSearch(
        searchRecipe(tagReload[0], item.title)
      );
      tagReload[0] = [...distinctFilteredRecipes];
    });
    isFilterReload(tagReload[0]);
    cards.DISPLAY_CARDS(tagReload[0]);
  }
  showListOfTags(tagsArray);
};

export const listenFilter = (data, keywords) => {
  originalRecipes.push(data);

  for (const keyword of keywords) {
    keyword.addEventListener("click", () => {
      let dataTitle = keyword.textContent;
      let dataColor = keyword.getAttribute("data-color");
      let tagObject = { title: `${dataTitle}`, color: `${dataColor}` };

      // Vérifie si le tag est présent pour éviter doublons OU lancer algo
      let inTagsArray = false;

      tagsArray.forEach((tag) => {
        inTagsArray = tag.title === tagObject.title;
      });

      if (!inTagsArray) {
        // affichage des tags
        tagsArray.push(tagObject);
        showListOfTags(tagsArray, data);

        //recherche sur chaque tag
        tagsArray.forEach((item) => {
          distinctFilteredRecipes = removeDuplicatedSearch(
            searchRecipe(data, item.title)
          );
          data = [...distinctFilteredRecipes];
        });

        isFilterReload(distinctFilteredRecipes);
        cards.DISPLAY_CARDS(distinctFilteredRecipes);

        // SI RESTE UNE CARD ALORS DÉSACTIVATION DES LI
        if (distinctFilteredRecipes.length === 1) {
          document.querySelectorAll(".filter__custom-option").forEach((li) => {
            li.classList.remove("filter__custom-option");
            li.classList.add("filter__custom-option--enable");
          });
        }

        // AU CLICK LE LI DEVIENT INACTIF ET GRISE
        tagsArray.forEach((tag) => {
          document.querySelectorAll(".filter__custom-option").forEach((li) => {
            if (tag.title.includes(li.textContent)) {
              li.classList.remove("filter__custom-option");
              li.classList.add("filter__custom-option--enable");
            }
          });
        });
      }
    });
  }
};

export const showListOfTags = function (arrayOfTags, data) {
  let tag_HTML = "";

  arrayOfTags.forEach((tag, index, data) => {
    tag_HTML += `<span class="tags__item tags__item--${tag.color}">
    <span  class="tags__name">${tag.title}</span>
    <span id="${index}" class="tags__close">
    <img src="./assets/image/remove-icon.png" alt=""
    /></span>
    </span>`;
  });
  document.querySelector(".tags").innerHTML = tag_HTML;

  listenToTags(data);
};
