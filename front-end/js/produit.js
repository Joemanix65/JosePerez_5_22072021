// récupération de la chaine de requête dans l'url 
const queryString_url_id = window.location.search;
//console.log(queryString_url_id);

// extraction de l'id tout seul
const leId = queryString_url_id.slice(4);
console.log(leId);

// affichage du produit en passant par l'id
fetch(`http://localhost:3000/api/cameras/${leId}`)
.then((response) => 
        response.json()
    .then(jsonProduct => {
            console.log(jsonProduct);
        let affichage = "";
            affichage += `<div class="img-container-produit">
                            <img class="img-cam" src="${jsonProduct.imageUrl}" alt="image de la caméra">
                        <div class="card-text">
                        <h3 class="card-titre">${jsonProduct.name}</h3>
                        <p class="card-description">${jsonProduct.description}</p>
                        <p class="card-prix-produit">${jsonProduct.price/100},00€</p>
                        <form>
                        <label for="option_produit">Type de lentille : </label>
                        <select id="option_produit" name="option_produit"></select>
                        </form>
                        <p class="input-text">Quantité :
                        <input id="input2" type="number" name="tentacles" min="1" max="10" value="1"></p>
                        <div class="button">
                            <a class="button1" href="../index.html">Retour Accueil</a>
                            <a class="button2" href="">Ajouter au panier</a>
                        </div>
                    </div>
                </div>`
            document.querySelector('#produit').innerHTML += affichage
                
            for(let i = 0; i < jsonProduct.lenses.length; i++)
                document.querySelector('#option_produit').innerHTML += `<option value="${i}">${jsonProduct.lenses[i]}</option>`;
                console.log(jsonProduct.lenses);

                //Sélection de l'id de la quantité
                const idQty = document.querySelector("#input2");
                console.log(idQty);

                //Sélection bouton Ajouter au panier
                const btn_ajouterPanier = document.querySelector(".button2");
                //console.log(btn_ajouterPanier);

                //Ecouter le btn et ajouter au panier
                btn_ajouterPanier.addEventListener("click", (event)=>{
                    event.preventDefault();

                //Sélection de l'id de l'option
                const idForm = document.querySelector("#option_produit").options[document.querySelector("#option_produit").selectedIndex].text;;
                console.log(idForm);

                //Mettre le choix de l'utilisateur dans une variable
                const choixQty = idQty.value;
                console.log(choixQty);


                    //Récupération valeurs du produit
                let selectProduit = {
                    Id_Produit: leId,
                    Nom: jsonProduct.name,
                    Prix: jsonProduct.price/100,
                    Option: idForm,
                    Quantité: choixQty
                }
                console.log(selectProduit);
                })

                
                
            }
        ));

//-------------------------------------Gestion du panier---------------------------------------
//Récupération des données sélectionnées par l'utilisateur 

