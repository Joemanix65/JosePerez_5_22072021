//Affichage de la validation de commande
const validCmd = document.querySelector("container-cmd");
const cmdAffiche = `
        <p> Merci ${donneeForm.civilité} ${donneeForm.nom} ${donneeForm.prenom}</p>
        <p> Votre commande n°: ${orderId} d'un montant total de ${sum}.00€
             
      `;
      validCmd.innerHTML = cmdAffiche;