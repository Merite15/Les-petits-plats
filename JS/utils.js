

// Mélanger les elements du tableau
export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Supprimer les doublons
export const deleteDuplicates = (array) => {
  let cleanDuplicate = [];
  array.forEach((item) => {
    cleanDuplicate.indexOf(item) == -1 ? cleanDuplicate.push(item) : "";
    return cleanDuplicate;
  });
};

// Mettre la premiere lettre en capital
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// RELOAD window.location.reload
export const windowLocationReload = () => {
};

// Fermer les tags
export const tagIsNoneSuccess = () => {
  document.getElementsByClassName("tags__item--success").style.display = "none";
};
export const tagIsNoneDanger = () => {
  document.getElementsByClassName("tags__item--danger").style.display = "none";
};
export const tagIsNonePrimary = () => {
  document.getElementsByClassName("tags__item--primary").style.display = "none";
};

export const deleteDuplicatesGoogled = (array) => {
  let cleanDuplicate = [];
  array.forEach((item) => {
    cleanDuplicate.indexOf(item) == -1 ? cleanDuplicate.push(item) : "";
  });
  return cleanDuplicate;
};

export const toLowercase = (str) => {
  return str.toLowerCase().trim()
}
