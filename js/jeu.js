document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-section form");
  const gameContainer = document.createElement("div");
  const messageDiv = document.createElement("p");

  // Style simple pour le jeu
  gameContainer.style.display = "none";
  gameContainer.style.marginTop = "20px";
  gameContainer.style.textAlign = "center";

  // Créer le contenu du jeu Pile ou Face
  gameContainer.innerHTML = `
      <p>Choisissez Pile ou Face :</p>
      <button id="pile-btn">Pile 🎵</button>
      <button id="face-btn">Face 🎶</button>
    `;

  // Ajouter le container juste après le formulaire
  form.parentNode.insertBefore(gameContainer, form.nextSibling);
  form.parentNode.insertBefore(messageDiv, gameContainer.nextSibling);

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Bloque l'envoi traditionnel
    messageDiv.textContent = "";
    form.style.display = "none"; // Cache le formulaire
    gameContainer.style.display = "block"; // Affiche le jeu
  });

  function playGame(userChoice) {
    const computerChoice = Math.floor(Math.random() * 2); // 0 ou 1
    if (userChoice === computerChoice) {
      messageDiv.style.color = "green";
      messageDiv.textContent = "🎉 Bravo ! Message envoyé avec succès !";
      gameContainer.style.display = "none";
      // Ici tu peux ajouter un vrai envoi AJAX si besoin
    } else {
      messageDiv.style.color = "red";
      messageDiv.textContent =
        "Dommage, vous avez perdu. Le formulaire a été réinitialisé.";
      gameContainer.style.display = "none";
      form.reset();
      form.style.display = "block";
    }
  }

  document
    .getElementById("pile-btn")
    .addEventListener("click", () => playGame(0));
  document
    .getElementById("face-btn")
    .addEventListener("click", () => playGame(1));
});
