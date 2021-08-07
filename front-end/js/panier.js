//Déclaration variable stockProductLocalStorage et lecture/conversion des données au format JSON (JSON.parse)
let stockProductLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(stockProductLocalStorage);