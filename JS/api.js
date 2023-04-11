import * as index from "../index.js";

// Get data
export const GET_RECIPES = (async () => {
  await fetch("./recipes.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      index.GET_RECIPES(data.recipes);

    })
    .catch((error) => {
      error.message;
    });
})();

// Constructeur
export function renderRecipes(data) {
  this.data = data;
  this.returnRecipes = function (data) {
    return data;
  };
}
