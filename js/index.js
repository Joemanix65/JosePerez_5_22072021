fetch("http://localhost:3000/api/cameras")
    .then((response) => 
        response.json()
    .then(jsonlistProduct => {
            let affichage = "";
        for (let camera of jsonlistProduct){ 
        affichage += `  <div class="img-container-index">
                            <img class="img-cam-index" src="${camera.imageUrl}" alt="image de la caméra">
                            <div class="card-text-index">
                                <h3 class="card-titre">${camera.name}</h3>
                                <p class="card-prix">${camera.price/100},00€</p>
                                <a class="productLink" href="view/produit.html?id=${camera._id}">Plus d'infos</a>
                            </div>
                        </div>`
                        console.log(camera._id);
        }
        document.querySelector('#produits').innerHTML += affichage
    }))
    .catch((err) => {
        console.log("Erreur: "+ err)
        alert ("Un problème empêche le chargement des produits sur la page")
    });