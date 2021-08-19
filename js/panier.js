//Déclaration variable stockProductLocalStorage et lecture/conversion des données au format JSON (JSON.parse)
let stockProductLocalStorage = JSON.parse(localStorage.getItem("product"));

//------------Tableau produit panier------------
//Sélection des classes pour injection code html
const tableProdPanier = document.querySelector("tbody");
const titrePanier = document.querySelector(".titreH1");
//Si panier vide alors afficher "Le panier est vide"
if (stockProductLocalStorage === null) {
  const paniertitre = `
    <div class="titreH1">
        <h1>Le panier est vide</h1>
    </div>
    `;
  titrePanier.innerHTML = paniertitre;
} else {
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
  for (j = 0; j < stockProductLocalStorage.length; j++) {
    panierPlein =
      panierPlein +
      `
            <tr>
                <td width=30% heidth="auto"><img class="img-cam-panier" src="${
                  stockProductLocalStorage[j].Article
                }"alt="image de la caméra"></td>
                <td>${stockProductLocalStorage[j].Nom}</td>
                <td>${stockProductLocalStorage[j].Option}</td>
                <td>${stockProductLocalStorage[j].Prix}.00 €</td>
                <td>${stockProductLocalStorage[j].Quantité}</td>
                <td width=10%><a href=""class="deleteRow"><i class="far fa-times-circle"></i></a></td>
                <td width=15%>${
                  stockProductLocalStorage[j].Quantité *
                  stockProductLocalStorage[j].Prix
                }.00 €</td>
            </tr>
        `;
  }
  tableProdPanier.innerHTML = panierPlein;

  //-----------------------Montant total du panier-------------------------------
  //récupération des prix dans le panier
  let sum = 0;
  for (let k = 0; k < stockProductLocalStorage.length; k++) {
    sum +=
      stockProductLocalStorage[k].Quantité * stockProductLocalStorage[k].Prix;
  }
  localStorage.setItem("montantTotal", sum);
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
    btnSup[l].addEventListener("click", (e) => supArticle(l));
  }

  function supArticle(index) {
    stockProductLocalStorage.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(stockProductLocalStorage));
  }
  //S'il ne reste plus d'article dans le panier affiche "panier vide"
  if (btnSup.length === 0) {
    localStorage.clear();
    window.location.reload();
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
  btnCommande.addEventListener("click", (e) => {
    e.preventDefault();

    //Valeurs formulaire vers localStorage
    const donneeForm = {
      Civilité: document.querySelector("input[name=btnradio]:checked").value,
      Nom: nom.value,
      Prénom: prenom.value,
      Mail: mail.value,
      Adresse: adresse.value,
      CP: cp.value,
      Ville: ville.value,
    };
    //------------Validation du formulaire-------------
    const textAlert = (value) => {
      return  `${value} : Les chiffres et les symboles ne sont pas autorisés \n 3 caractères minimum et 25 caractères maximum`
    };
    const regExNomPrenomVille = (value) => {
      return /^[A-Z][A-Za-z\é\è\ê\-]{3,25}$/.test(value);
    };
    const regExCP = (value) => {
      return /^[0-9]{5}$/.test(value);
    };
    const regExMail = (value) => {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    };
    const regExAdresse = (value) => {
      return /^[A-Za-z0-9\s]{6,40}$/.test(value);
    };
    function nomControle() {
      const leNom = donneeForm.Nom;
      if (regExNomPrenomVille(leNom)) {
        return true;
      } else {
        alert(textAlert("Nom"));
        return false;
      }
    };
    function prenomControle() {
      const lePrenom = donneeForm.Prénom;
      if (regExNomPrenomVille(lePrenom)) {
        return true;
      } else {
        alert(textAlert("Prénom"));
        return false;
      }
    };
    function villeControle() {
      const laVille = donneeForm.Ville;
      if (regExNomPrenomVille(laVille)) {
        return true;
      } else {
        alert(textAlert("Ville"));
        return false;
      }
    };
    function cpControle() {
      const leCP = donneeForm.CP;
      if (regExCP(leCP)) {
        return true;
      } else {
        alert("Le code postal doit être composé de 5 chiffres");
        return false;
      }
    };
    function mailControle() {
      const leMail = donneeForm.Mail;
      if (regExMail(leMail)) {
        return true;
      } else {
        alert("L'adresse mail n'est pas valide");
        return false;
      }
    };
    function adresseControle() {
      const lAdresse = donneeForm.Adresse;
      if (regExAdresse(lAdresse)) {
        return true;
      } else {
        alert("L'adresse n'est pas valide");
        return false;
      }
    };
    if (nomControle() && prenomControle() && villeControle() && cpControle() && mailControle() && adresseControle()) {
      localStorage.setItem("donneeForm", JSON.stringify(donneeForm));
      //messageCommande();
    } else {
      return alert("Données non valide, merci de renseigner des données valide!");
    };

    const contact = {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: mail.value,
    };

    const products = [];
    for (cameras of stockProductLocalStorage) {
      const productsId = cameras.Id_Produit;
      products.push(productsId);
    }

    const donneeCommande = { contact, products };

    const sendCmd = async function (getOrder) {
      try {
        const res = await fetch("http://localhost:3000/api/cameras/order", {
          method: "POST",
          body: JSON.stringify(getOrder),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const getOrder = await res.json();
          localStorage.setItem("cmdId", getOrder.orderId);
        } else {
          throw new Error(`${res.statusText} (${res.status})`);
        }
      } catch (err) {
        Error;
      }
    };
    sendCmd(donneeCommande);
    const messageCommande = () => {
      if (window.confirm(`Confirmation de la commande`)) {
        window.location.href = "commande.html";
      } else {
        window.location.href = "../index.html";
      }
    };

    if (donneeForm) {
      messageCommande();
    }
  });
}
