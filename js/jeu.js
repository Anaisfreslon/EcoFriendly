// Attend que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne le formulaire présent dans la section ".form-section"
  const form = document.querySelector(".form-section form");

  // Crée un élément <div> pour le jeu "Pile ou Face"
  const gameContainer = document.createElement("div");

  // Crée un élément <p> pour afficher les messages de résultat
  const messageDiv = document.createElement("p");

  // Applique un style simple au container du jeu
  gameContainer.style.display = "none"; // Caché par défaut
  gameContainer.style.marginTop = "20px";
  gameContainer.style.textAlign = "center";

  // Définit le contenu HTML du jeu avec deux boutons
  gameContainer.innerHTML = `
      <p>Choisissez Pile ou Face :</p>
      <button id="pile-btn">Pile 🎵</button>
      <button id="face-btn">Face 🎶</button>
    `;

  // Insère le container du jeu juste après le formulaire
  form.parentNode.insertBefore(gameContainer, form.nextSibling);
  // Insère la div de message juste après le jeu
  form.parentNode.insertBefore(messageDiv, gameContainer.nextSibling);

  // Gère la soumission du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche l'envoi traditionnel du formulaire
    messageDiv.textContent = ""; // Réinitialise les messages précédents
    form.style.display = "none"; // Cache le formulaire
    gameContainer.style.display = "block"; // Affiche le jeu
  });

  // Fonction principale du jeu "Pile ou Face"
  function playGame(userChoice) {
    const computerChoice = Math.floor(Math.random() * 2); // Génère 0 ou 1 aléatoirement
    if (userChoice === computerChoice) {
      // Si l'utilisateur a deviné correctement
      messageDiv.style.color = "green";
      messageDiv.textContent = "🎉 Bravo ! Message envoyé avec succès !";
      gameContainer.style.display = "none";
      // Ici, on pourrait déclencher un envoi AJAX si nécessaire
    } else {
      // Si l'utilisateur a perdu
      messageDiv.style.color = "red";
      messageDiv.textContent =
        "Dommage, vous avez perdu. Le formulaire a été réinitialisé.";
      gameContainer.style.display = "none";
      form.reset(); // Réinitialise les champs du formulaire
      form.style.display = "block"; // Réaffiche le formulaire
    }
  }

  // Ajoute les gestionnaires d'événements pour les boutons du jeu
  document
    .getElementById("pile-btn")
    .addEventListener("click", () => playGame(0));
  document
    .getElementById("face-btn")
    .addEventListener("click", () => playGame(1));
});
