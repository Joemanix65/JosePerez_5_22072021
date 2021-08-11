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
                <td width=22% heidth="auto"><img class="img-cam-panier" src="${stockProductLocalStorage[j].Article}"alt="image de la caméra"></td>
                <td>${stockProductLocalStorage[j].Nom}</td>
                <td>${stockProductLocalStorage[j].Option}</td>
                <td>${stockProductLocalStorage[j].Prix}.00 €</td>
                <td>${stockProductLocalStorage[j].Quantité}</td>
                <td width=10%><a href=""class="deleteRow"><i class="far fa-times-circle"></i></a></td>
                <td width=15%>${stockProductLocalStorage[j].Quantité * stockProductLocalStorage[j].Prix}.00 €</td>
            </tr>
        `;
    }
    tableProdPanier.innerHTML = panierPlein;

    //-----------------------Montant total du panier-------------------------------
    //récupération des prix dans le panier
    let sum = 0;
    for (let k = 0 ;k < stockProductLocalStorage.length; k++){
        sum += stockProductLocalStorage[k].Quantité * stockProductLocalStorage[k].Prix;
        console.log(sum);
    }

    //Affichage du tfoot avec le montant total
    const tableFoot = document.querySelector("tfoot");
    const panierTfoot = `
            <tfoot>
                <tr>
                    <td colspan="6">Montant total</td>
                    <td>${sum}.00€</td>
                </tr>
            </tfoot>
        `;
    tableFoot.innerHTML = panierTfoot;
   

//--------------------Suppression d'un article du panier-----------------------
    const btnSup = document.querySelectorAll(".deleteRow");
    console.log(btnSup);
    for (let l = 0; l < btnSup.length; l++) {
    console.log(l);
    btnSup[l].addEventListener("click", () => supArticle(l));
    }

    function supArticle(index) {
        //const index = stockProductLocalStorage.indexOf ("product");
        stockProductLocalStorage.splice(index, 1);
        localStorage.setItem("product", JSON.stringify(stockProductLocalStorage));
        }
    }   
    
//----------------------------Vider le panier----------------------------------
let viderPanier = document.querySelector(".button2");
viderPanier.addEventListener("click", () => localStorage.clear()); 
    