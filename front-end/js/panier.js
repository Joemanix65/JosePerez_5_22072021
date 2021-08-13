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
                <td width=30% heidth="auto"><img class="img-cam-panier" src="${stockProductLocalStorage[j].Article}"alt="image de la caméra"></td>
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
    for (let l = 0; l < btnSup.length; l++) {
        btnSup[l].addEventListener("click", (e) => supArticle(l))
    }

    function supArticle(index) {
        stockProductLocalStorage.splice(index, 1);
        localStorage.setItem("product", JSON.stringify(stockProductLocalStorage));
    }
 //S'il ne reste plus d'article dans le panier affiche "panier vide"
    if (btnSup.length === 0) {localStorage.clear();
        window.location.reload();
    }   
}  
//----------------------------Vider le panier----------------------------------
    const videPanier = document.querySelector(".button2");
    videPanier.addEventListener("click", () => localStorage.clear()); 


//------------------------------Formulaire-------------------------------------

const affichageFormulaire = () => {
    const formulaireElement = document.querySelector(".container-formulaire");

    const templateFormulaire = `
    <h2>Remplissez le formulaire pour valider la commande :</h2>
                <form>
                    <div>
                        <fieldset>
                            <legend>Civilité<abbr title="Ce champ est obligatoire">*</abbr></legend>
                            <label for="mr">M.</label>
                            <input type="radio" id="civil" name=btnradio value="M." checked>
                            <label for="mme">Mme</label>
                            <input type="radio" id="civil" name=btnradio value="Mme">
                        </fieldset>
                    </div>
                    <p>
                        <label for ="nom">Nom :<abbr title="Ce champ est obligatoire">*</abbr></label>
                        <input type="text" id="nom" name="nom" required placeholder="Entrez votre nom">
                    </p>  
                    <p>
                        <label for ="prenom">Prénom :<abbr title="Ce champ est obligatoire">*</abbr></label>
                        <input type="text" id="prenom" name="prenom" required placeholder="Entrez votre prénom">
                    </p>
                    <p>
                        <label for ="mail">Adresse mail :<abbr title="Ce champ est obligatoire">*</abbr></label>
                        <input type="email" id="mail" name="mail" required placeholder="Entrez votre adresse mail">
                    <p>  
                        <label for ="adresse">Adresse :<abbr title="Ce champ est obligatoire">*</abbr></label>
                        <input type="text" id="adresse" name="adresse" required placeholder="Entrez votre adresse">
                    </p>
                    <p>
                        <label for ="cp">Code postal :<abbr title="Ce champ est obligatoire">*</abbr></label>
                        <input type="number" id="cp" name="cp" required placeholder="Entrez votre code postal">
                    </p>    
                    <p>
                        <label for ="ville">Ville :<abbr title="Ce champ est obligatoire">*</abbr></label>
                        <input type="text" id="ville" name="ville" required placeholder="Entrez votre ville">
                    </p>
                    <p>
                        <button class="button3">Commander</button>
                    </p>
                </form>
    `;
    formulaireElement.insertAdjacentHTML("afterend", templateFormulaire);
};
//Affichage formulaire
affichageFormulaire();

//bouton pour envoyer la commande
const btnCommande = document.querySelector(".button3");
btnCommande.addEventListener("click", () => {
    //Valeurs formulaire vers localStorage
    localStorage.setItem("civilité", document.querySelector("input[name=btnradio]:checked").value);
    console.log(document.querySelector("input[name=btnradio]:checked").value);
    localStorage.setItem("nom", document.querySelector("#nom").value);
    localStorage.setItem("prenom", document.querySelector("#prenom").value);
    localStorage.setItem("mail", document.querySelector('input[name=btnradio]:checked').value);
    localStorage.setItem("adresse", document.querySelector('input[name=btnradio]:checked').value);
    localStorage.setItem("cp", document.querySelector('input[name=btnradio]:checked').value);
    localStorage.setItem("ville", document.querySelector('input[name=btnradio]:checked').value);
})
