import * as index from "../index.js";

// Get data
export const GET_RECIPES = (async () => {
  await fetch("./data/recipes.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      index.GET_RECIPES_HYDRATE(data.recipes);

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
