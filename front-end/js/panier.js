//Déclaration variable stockProductLocalStorage et lecture/conversion des données au format JSON (JSON.parse)
let stockProductLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(stockProductLocalStorage);

//------------Tableau produit panier------------
//Sélection classe pour injection code html
const tableProdPanier = document.querySelector("tbody");
console.log(tableProdPanier);
const titrePanier = document.querySelector(".titreH1");
console.log(titrePanier);
//Si panier vide alors afficher "Le panier est vide"
if(stockProductLocalStorage === null){
    const paniertitre = `
    <div class="titreH1">
        <h1>Le panier est vide</h1>
    </div>
    `;
    titrePanier.innerHTML = paniertitre;
} else{
//Si panier non vide affichage des produits du localStorage
    //Affichage du titre "Votre panier"
    const paniertitre = `
    <div class="titreH1">
        <h1>Votre panier</h1>
    </div>
    `;
    titrePanier.innerHTML = paniertitre;
    //Affichage des articles dans le tbody du tableau
    let panierPlein = [];
    for(j = 0; j < stockProductLocalStorage.length; j++ ){
        panierPlein = panierPlein + `
            <tr>
                <td width=25% heidth="auto"><img class="img-cam-panier" src="${stockProductLocalStorage[j].Article}"alt="image de la caméra"></td>
                <td>${stockProductLocalStorage[j].Nom}</td>
                <td>${stockProductLocalStorage[j].Option}</td>
                <td>${stockProductLocalStorage[j].Prix}.00 €</td>
                <td>${stockProductLocalStorage[j].Quantité}</td>
                <td width=10% heidth="auto"><a href""><i class="far fa-times-circle"></i></a></td>
                <td width=15% heidth="auto">${stockProductLocalStorage[j].Quantité * stockProductLocalStorage[j].Prix}.00 €</td>
            </tr>
        `;
    }
    tableProdPanier.innerHTML = panierPlein;
    //Affichage du tfoot avec le montant total
    const tableFoot = document.querySelector("tfoot");
    const panierTfoot = `
            <tfoot>
                <tr>
                    <td colspan="6">Montant total</td>
                    <td>somme</td>
                </tr>
            </tfoot>
        `;
    tableFoot.innerHTML = panierTfoot;
}   