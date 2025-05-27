// =======================
// 1. Prévention du plagiat (copie)
// =======================
document.addEventListener("copy", function (event) {
  console.log(
    "Attention : Le plagiat est interdit. Veuillez respecter les droits d'auteur et citer vos sources !"
  );
});

// =======================
// 2. Horloge temps réel
// =======================
function updateClock() {
  const now = new Date(); // Récupère l'heure actuelle
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Affiche l'heure dans l'élément avec l'ID 'clock'
  document.getElementById(
    "clock"
  ).textContent = `Horloge : ${hours}:${minutes}:${seconds}`;
}

// =======================
// 3. Chronomètre depuis l’arrivée sur la page
// =======================
let secondsOnPage = 0;

function updateTimer() {
  secondsOnPage++; // Incrémente le compteur chaque seconde
  const hrs = Math.floor(secondsOnPage / 3600);
  const mins = Math.floor((secondsOnPage % 3600) / 60);
  const secs = secondsOnPage % 60;
  const formatted = `${hrs}h ${mins}m ${secs}s`;

  // Affiche le temps passé sur la page dans l’élément avec l’ID 'timer'
  document.getElementById(
    "timer"
  ).textContent = `Temps sur la page : ${formatted}`;
}

// =======================
// 4. Démarrage de l’horloge et du chronomètre une fois la page chargée
// =======================
window.addEventListener("DOMContentLoaded", () => {
  updateClock(); // Mise à jour initiale de l'horloge
  setInterval(updateClock, 1000); // Mise à jour toutes les secondes
  setInterval(updateTimer, 1000); // Incrémente le temps passé sur la page
});

// =======================
// 5. Confirmation avant d’ouvrir la page équipe
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const equipeLink = document.getElementById("equipe-link");

  if (equipeLink) {
    equipeLink.addEventListener("click", function (e) {
      // Boîte de confirmation
      const confirmation = confirm(
        "Souhaitez-vous vraiment visiter la page PRÉSENTATION DE L'ÉQUIPE ?"
      );

      if (!confirmation) {
        e.preventDefault(); // Empêche la navigation si refus
        return false;
      }
    });
  }
});

// =======================
// 6. Fonctionnalité de grattage (canvas)
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const canvases = document.querySelectorAll("canvas.grattage");

  canvases.forEach((canvas) => {
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    resizeCanvas(); // Ajuste à la taille parent
    window.addEventListener("resize", resizeCanvas); // Reajuste si redimensionnement

    // Remplit le canvas avec un fond gris
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function scratch(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = 20;

      ctx.globalCompositeOperation = "destination-out"; // Permet d'effacer
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over"; // Retour au mode normal
    }

    canvas.addEventListener("mousemove", scratch); // Souris

    canvas.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        for (let touch of e.touches) {
          scratch({
            clientX: touch.clientX,
            clientY: touch.clientY,
          });
        }
      },
      { passive: false }
    );
  });
});

// =======================
// 7. Bouton mode édition sécurisé
// =======================
document.getElementById("edit-mode-btn").addEventListener("click", () => {
  const username = prompt("Nom d'utilisateur admin :");
  if (username !== "admin") {
    alert("Nom incorrect.");
    return;
  }
  const password = prompt("Mot de passe :");
  if (password !== "admin_pwd") {
    alert("Mot de passe incorrect.");
    return;
  }

  // Stocke un indicateur de mode édition et redirige
  localStorage.setItem("editMode", "true");
  window.location.href = "html/equipe.html";
});

// =======================
// 8. Placeholder pour animation de chargement (loader)
// =======================
document.addEventListener("DOMContentLoaded", function () {
  // Code à ajouter si on souhaite afficher un loader
});

// =======================
// 9. Flèche de retour en haut de page
// =======================
const scrollTopBtn = document.createElement("div");
scrollTopBtn.id = "scrollTopBtn";
scrollTopBtn.innerHTML = "⬆";
scrollTopBtn.style.position = "fixed";
scrollTopBtn.style.bottom = "40px";
scrollTopBtn.style.right = "40px";
scrollTopBtn.style.background = "#6ccda4";
scrollTopBtn.style.color = "white";
scrollTopBtn.style.padding = "10px";
scrollTopBtn.style.borderRadius = "50%";
scrollTopBtn.style.fontSize = "20px";
scrollTopBtn.style.cursor = "pointer";
scrollTopBtn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
scrollTopBtn.style.display = "none";

document.body.appendChild(scrollTopBtn);

// Affiche la flèche après scroll de 200px
window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

// Remonte tout en haut au clic
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =======================
// 10. Alternance d’image au clic
// =======================
document.querySelectorAll(".toggle-img").forEach((img) => {
  img.addEventListener("click", () => {
    const current = img.getAttribute("src"); // Source actuelle
    const alt = img.getAttribute("data-alt"); // Source alternative
    img.setAttribute("src", alt); // Bascule l’image
    img.setAttribute("data-alt", current);
  });
});

// =======================
// 11. Filtrage des produits par formulaire
// =======================
const filterForm = document.querySelector("#filter-form");
const productItems = document.querySelectorAll(".product-card");

if (filterForm) {
  filterForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche l’envoi du formulaire

    const nameValue = document
      .querySelector("#filter-name")
      .value.toLowerCase();
    const themeValue = document.querySelector("#filter-theme").value;
    const minPrice =
      parseFloat(document.querySelector("#filter-min").value) || 0;
    const maxPrice =
      parseFloat(document.querySelector("#filter-max").value) || Infinity;

    // Filtrage basé sur nom, thème et prix
    productItems.forEach((item) => {
      const name = item.dataset.name.toLowerCase();
      const theme = item.dataset.theme;
      const price = parseFloat(item.dataset.price);

      const matchesName = name.includes(nameValue);
      const matchesTheme = themeValue === "" || theme === themeValue;
      const matchesPrice = price >= minPrice && price <= maxPrice;

      // Affiche ou cache l’élément selon les critères
      item.style.display =
        matchesName && matchesTheme && matchesPrice ? "block" : "none";
    });
  });
}
