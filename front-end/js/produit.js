// récupération de la chaine de requête dans l'url 
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

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
                    <p class="input-text">Type de lentille:
                    <select name="lentille-type" id="input1"><option value="35mm">${jsonProduct.lenses[0]}</option><option value="35mm">${jsonProduct.lenses[1]}</option><option value="35mm">${jsonProduct.lenses[2]}</option></select></p>
                    <p class="input-text">Quantité:
                    <input id="input2" type="number" name="tentacles" min="1" max="10" value="1"></p>
                    <div class="button">
                        <a class="button1" href="../index.html">Retour Accueil</a>
                        <a class="button2" href="">Acheter</a>
                    </div>
                </div>
                
            </div>`
            document.querySelector('#produit').innerHTML += affichage
            }))
            
              