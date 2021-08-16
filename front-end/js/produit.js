// récupération de la chaine de requête dans l'url 
const queryString_url_id = window.location.search;

// extraction de l'id tout seul
const leId = queryString_url_id.slice(4);
console.log(leId);

// affichage du produit en passant par l'id
fetch(`http://localhost:3000/api/cameras/${leId}`)
.then((response) => 
        response.json()
    .then(jsonProduct => {
        let affichage = "";
            affichage += `<div class="img-container-produit">
                            <img class="img-cam" src="${jsonProduct.imageUrl}" alt="image de la caméra">
                        <div class="card-text">
                        <h3 class="card-titre">${jsonProduct.name}</h3>
                        <p class="card-description">${jsonProduct.description}</p>
                        <p class="card-prix-produit">${jsonProduct.price/100},00€</p>
                        
                        <p class="input-text">Type de lentille : </label>
                        <select id="option_produit" name="option_produit"></select></p>
                        
                        <p class="input-text">Quantité :
                        <input id="input1" type="number" name="QtyArticle" min="1" max="10" value="1"></p>
                        <div class="button">
                            <a class="button1" href="../index.html">Retour Accueil</a>
                            <a class="button2" href="">Ajouter au panier</a>
                        </div>
                    </div>
                </div>`
            document.querySelector('#produit').innerHTML += affichage
                
            for(let i = 0; i < jsonProduct.lenses.length; i++)
                document.querySelector('#option_produit').innerHTML += `<option value="${i}">${jsonProduct.lenses[i]}</option>`;

//-------------------------------------Gestion de l'envoi vers le panier---------------------------------------
        //Récupération des données sélectionnées par l'utilisateur 
                //Sélection de l'id de la quantité
                const idQty = document.querySelector("#input1");

                //Sélection bouton Ajouter au panier
                const btn_ajouterPanier = document.querySelector(".button2");

                //Ecouter le btn et ajouter au panier
                btn_ajouterPanier.addEventListener("click", (event)=>{
                    event.preventDefault();

                //Sélection de l'id de l'option
                const idForm = document.querySelector("#option_produit").options[document.querySelector("#option_produit").selectedIndex].text;

                //Mettre le choix de l'utilisateur dans une variable
                const choixQty = idQty.value;

                //Récupération valeurs du produit
                let selectProduit = {
                    Id_Produit: leId,
                    Article: jsonProduct.imageUrl,
                    Nom: jsonProduct.name,
                    Prix: jsonProduct.price/100,
                    Option: idForm,
                    Quantité: choixQty
                }

//-------------------------------------Local Storage---------------------------------------
                //Déclaration variable stockProductLocalStorage et lecture/conversion des données au format JSON (JSON.parse)
                let stockProductLocalStorage = JSON.parse(localStorage.getItem("product"));
                console.log(stockProductLocalStorage);

                //message
                const messageValidation = () =>{
                    if(window.confirm(`Confirmation de l'ajout au panier du modèle ${jsonProduct.name} avec l'option ${idForm} pour consulter le panier clic sur OK ou ANNULER pur continuer vos achats`)){
                        window.location.href = "panier.html";
                    }else{
                        window.location.href = "../index.html";  
                    };
                }

                //Fonction ajout du produit dans le localStorage
                const productVersLocalStorage = () => {
                    stockProductLocalStorage.push(selectProduit);
                    localStorage.setItem("product", JSON.stringify(stockProductLocalStorage));
                }
                //Verifie si la clé existe déjà on rajoute des items/valeurs
                if(stockProductLocalStorage){
                    productVersLocalStorage();
                    messageValidation();
                }
                //Si la clé n'éxiste pas on la crée, enregistrement/conversion des données au format Objet (JSON.stringify)
                else{
                    stockProductLocalStorage = [];
                    productVersLocalStorage();
                    console.log(stockProductLocalStorage);
                    messageValidation();
                    }
                })
            }
        ))

        .catch((err) => {
            console.log("Erreur: "+ err)
            alert ("Un problème empêche le chargement des produits sur la page")
        });