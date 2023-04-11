//exemple algo boucle for et boucle sup

const fruits = ["orange", "pomme", "banane", "cerise", "kiwi", "clementine"];

// algo utilisant les boucles natives (while, for...)
const algoFruit1 = (tab, letter) => {
  let result = [];
  for (let i = 0; i < tab.length; i++) {
    let fruit = tab[i];

    for (let j = 0; j < fruit.length; j++) {
      if (fruit[j] === letter) {
        result.push(fruit);
        break;
      }
    }
  }
  return result;
};

// algo programmation fonctionnelle avec les méthodes de l'objet array (foreach, filter, map, reduce)
const algoFruit2 = (tab, letter) => {
  let result = tab.filter((fruit) => fruit.includes(letter));
  return result;
};

console.log(algoFruit1(fruits, "n"));
console.log(algoFruit2(fruits, "n"));
