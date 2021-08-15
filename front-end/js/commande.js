//Affichage de la validation de commande
let donneeFormLS = JSON.parse(localStorage.getItem("donneeForm"));
let montant = localStorage.getItem("montantTotal");
let cmd = localStorage.getItem("cmdId");
console.log(donneeFormLS);
console.log(montant);
console.log(cmd);
const validCmd = document.querySelector(".container-cmd");

if (donneeFormLS === null) {
 
}else{
const cmdAffiche = `
        <div>
        <h1>Confirmation de commande</h1>
        <p> Merci pour vos achats ${donneeFormLS.Civilité} ${donneeFormLS.Nom} ${donneeFormLS.Prénom}.</p>
        <p> Votre commande n°: ${cmd} </p>
        <p>d'un montant total de ${montant},00 €</p>
        <p> vous sera livrée dans les meilleurs délais </p>
        </div>
             
      `;
      validCmd.innerHTML = cmdAffiche;
};
localStorage.clear()