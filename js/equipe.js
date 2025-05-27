// =======================
// VARIABLE POUR SUIVRE L'ÉTAT DU MODE ÉDITION
// =======================
let isEditing = false; // false = mode édition désactivé, true = activé

// =======================
// FONCTION PRINCIPALE POUR BASCULER LE MODE ÉDITION
// =======================
function toggleEditMode() {
  // On récupère le bouton qui déclenche le mode édition
  const button = document.getElementById("edit-mode-btn");

  // Si on n'est pas encore en mode édition, on tente de l'activer
  if (!isEditing) {
    // Demande du nom d'utilisateur avec un prompt
    const username = prompt("Entrez le nom d'utilisateur :");
    console.log("Username saisi :", username); // Affiche dans la console ce que l'utilisateur a tapé

    // Vérification simple que le nom d'utilisateur est "admin" (sans tenir compte des majuscules/minuscules)
    if (!username || username.trim().toLowerCase() !== "admin") {
      alert("Nom d'utilisateur incorrect !");
      return; // Arrête la fonction, on ne passe pas en mode édition
    }

    // Demande du mot de passe avec un prompt
    const password = prompt("Entrez le mot de passe :");
    console.log("Password saisi :", password); // Affiche dans la console le mot de passe saisi

    // Vérification que le mot de passe est "admin_pwd" (sensible à la casse ici)
    if (!password || password.trim() !== "admin_pwd") {
      alert("Mot de passe incorrect !");
      return; // Arrête la fonction, on ne passe pas en mode édition
    }

    // Si tout est correct, on active le mode édition
    isEditing = true;

    // On ajoute une classe CSS "editing" au bouton pour changer son style (optionnel)
    button.classList.add("editing");

    // On change le texte du bouton pour indiquer qu'on est en mode édition
    button.textContent = "Quitter le mode édition";

    // On active les fonctionnalités d'édition (rendre les éléments modifiables, afficher boutons supprimer etc.)
    enableEditing();
  } else {
    // Si on est déjà en mode édition, on propose de quitter ce mode avec une confirmation
    const confirmExit = confirm("Voulez-vous quitter le mode édition ?");
    if (confirmExit) {
      // Si l'utilisateur confirme la sortie

      // On désactive le mode édition
      isEditing = false;

      // On retire la classe CSS "editing" du bouton
      button.classList.remove("editing");

      // On remet le texte d'origine au bouton
      button.textContent = "Mode édition";

      // On désactive les fonctionnalités d'édition
      disableEditing();
    }
  }
}

// =======================
// FONCTION POUR ACTIVER LE MODE ÉDITION
// =======================
function enableEditing() {
  // On sélectionne tous les éléments avec la classe "member-name" (noms des membres) et on les rend éditables
  document.querySelectorAll(".member-name").forEach((name) => {
    name.contentEditable = true; // Permet à l'utilisateur de modifier directement le texte
  });

  // On affiche tous les boutons de suppression (classe "delete-btn")
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.style.display = "inline";
  });

  // On affiche aussi le bouton pour ajouter un membre
  document.getElementById("add-member-btn").style.display = "inline";
}

// =======================
// FONCTION POUR DÉSACTIVER LE MODE ÉDITION
// =======================
function disableEditing() {
  // On rend les noms des membres non modifiables
  document.querySelectorAll(".member-name").forEach((name) => {
    name.contentEditable = false;
  });

  // On masque tous les boutons de suppression
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.style.display = "none";
  });

  // On masque aussi le bouton pour ajouter un membre
  document.getElementById("add-member-btn").style.display = "none";
}

// =======================
// FONCTION POUR CONFIGURER LES BOUTONS DE SUPPRESSION
// =======================
function setupDeleteButtons() {
  // Pour chaque bouton de suppression
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    // On ajoute un écouteur d'événement "click"
    btn.addEventListener("click", () => {
      // Quand on clique, on supprime l'élément parent (la carte/membre complet)
      btn.parentElement.remove();
    });
  });
}

// =======================
// FONCTION POUR CONFIGURER LE BOUTON AJOUTER MEMBRE
// =======================
function setupAddMember() {
  // On récupère le bouton d'ajout de membre
  const addBtn = document.getElementById("add-member-btn");

  // On écoute le clic sur ce bouton
  addBtn.addEventListener("click", () => {
    // Création d'un nouveau conteneur (div) pour le membre
    const container = document.createElement("div");
    container.className = "team-member";

    // On remplit ce conteneur avec le contenu HTML d'un nouveau membre par défaut
    container.innerHTML = `
      <canvas class="grattage"></canvas>
      <img src="../img/equipe/Photo1.png" alt="Nouveau membre" />
      <h3 class="member-name" contenteditable="true">Nouveau membre</h3>
      <p>Rôle</p>
      <p>Description du membre.</p>
      <div class="social-links">
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
      </div>
      <button class="delete-btn" style="display: inline;">🗑️</button>
    `;

    // On ajoute ce nouveau membre à la liste des membres dans la page
    document.querySelector(".team-container").appendChild(container);

    // On réinitialise les écouteurs sur les boutons supprimer pour inclure ce nouveau bouton
    setupDeleteButtons();
  });
}

// =======================
// INITIALISATION AU CHARGEMENT DU DOM
// =======================
document.addEventListener("DOMContentLoaded", () => {
  // Quand la page est chargée, on lie le bouton "edit-mode-btn" au toggle de mode édition
  document
    .getElementById("edit-mode-btn")
    .addEventListener("click", toggleEditMode);

  // On configure les boutons supprimer existants
  setupDeleteButtons();

  // On configure le bouton ajouter membre
  setupAddMember();
});
