let isEditing = false;

function toggleEditMode() {
  const button = document.getElementById("edit-mode-btn");

  if (!isEditing) {
    const username = prompt("Entrez le nom d'utilisateur :");
    console.log("Username saisi :", username);

    if (!username || username.trim().toLowerCase() !== "admin") {
      alert("Nom d'utilisateur incorrect !");
      return;
    }

    const password = prompt("Entrez le mot de passe :");
    console.log("Password saisi :", password);

    if (!password || password.trim() !== "admin_pwd") {
      alert("Mot de passe incorrect !");
      return;
    }

    isEditing = true;
    button.classList.add("editing");
    button.textContent = "Quitter le mode édition";
    enableEditing();
  } else {
    const confirmExit = confirm("Voulez-vous quitter le mode édition ?");
    if (confirmExit) {
      isEditing = false;
      button.classList.remove("editing");
      button.textContent = "Mode édition";
      disableEditing();
    }
  }
}

function enableEditing() {
  document.querySelectorAll(".member-name").forEach((name) => {
    name.contentEditable = true;
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.style.display = "inline";
  });

  document.getElementById("add-member-btn").style.display = "inline";
}

function disableEditing() {
  document.querySelectorAll(".member-name").forEach((name) => {
    name.contentEditable = false;
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.style.display = "none";
  });

  document.getElementById("add-member-btn").style.display = "none";
}

function setupDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.remove();
    });
  });
}

function setupAddMember() {
  const addBtn = document.getElementById("add-member-btn");
  addBtn.addEventListener("click", () => {
    const container = document.createElement("div");
    container.className = "team-member";

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

    document.querySelector(".team-container").appendChild(container);
    setupDeleteButtons();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("edit-mode-btn")
    .addEventListener("click", toggleEditMode);
  setupDeleteButtons();
  setupAddMember();
});
