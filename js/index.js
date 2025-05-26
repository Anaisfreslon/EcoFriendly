// plagiat.js
document.addEventListener("copy", function (event) {
  console.log(
    "Attention : Le plagiat est interdit. Veuillez respecter les droits d'auteur et citer vos sources !"
  );
});

// =======================
// Horloge temps réel
// =======================
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById(
    "clock"
  ).textContent = `Horloge : ${hours}:${minutes}:${seconds}`;
}

// =======================
// Chronomètre depuis l'arrivée
// =======================
let secondsOnPage = 0;

function updateTimer() {
  secondsOnPage++;
  const hrs = Math.floor(secondsOnPage / 3600);
  const mins = Math.floor((secondsOnPage % 3600) / 60);
  const secs = secondsOnPage % 60;
  const formatted = `${hrs}h ${mins}m ${secs}s`;
  document.getElementById(
    "timer"
  ).textContent = `Temps sur la page : ${formatted}`;
}

// =======================
// Démarrage des timers
// =======================
window.addEventListener("DOMContentLoaded", () => {
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(updateTimer, 1000);
});

// Ce code s'exécute une fois que toute la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  const equipeLink = document.getElementById("equipe-link");

  // Vérifie que le lien existe
  if (equipeLink) {
    equipeLink.addEventListener("click", function (e) {
      // Affiche la fenêtre de confirmation
      const confirmation = confirm(
        "Souhaitez-vous vraiment visiter la page PRÉSENTATION DE L'ÉQUIPE ?"
      );

      // Si l'utilisateur clique sur "Non", on empêche la navigation
      if (!confirmation) {
        e.preventDefault(); // Cela empêche la page de s'ouvrir
        return false;
      }
    });
  }
});


//code pour le grattage

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne tous les canvas grattage
  const canvases = document.querySelectorAll("canvas.grattage");

  canvases.forEach((canvas) => {
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    // Ajuste la taille du canvas pour qu'il recouvre la carte
    function resizeCanvas() {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Remplit le canvas en gris opaque
    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fonction pour "effacer" une petite zone autour du curseur
    function scratch(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = 20; // taille de la zone grattée

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }

    // Quand la souris est en mouvement sur le canvas, on gratte
    canvas.addEventListener("mousemove", scratch);

    // Gestion tactile
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


//code pour le bouton edition 
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

  // Authentification réussie
  localStorage.setItem("editMode", "true");
  window.location.href = "html/equipe.html"; // redirection
});


//code pour l'attente du loader 
document.addEventListener("DOMContentLoaded", function () {
  // // Sélectionne tous les liens de la page
  // const links = document.querySelectorAll("a[href]");

  // links.forEach(function (link) {
  //   link.addEventListener("click", function (e) {
  //     e.preventDefault(); // Empêche la navigation immédiate

  //     const destination = this.href; // Récupère l'URL de destination

  //     // Affiche le loader
  //     const loader = document.getElementById("loader");
  //     if (loader) {
  //       loader.style.display = "flex"; // Assurez-vous que le loader utilise 'display: flex' ou une autre valeur appropriée
  //     }

  //     // Attend 2 secondes, puis navigue vers la page
  //     setTimeout(function () {
  //       window.location.href = destination;
  //     }, 2000);
  //   });
  // });
  
});

// 1ere étape : faire un choix
//          1. copier coller le code html/css du loader sur toutes les pages
//          2. créer et supprimer les éléments du loader en JS
//
// 2ème étape : créer les éléments du loader (createElement), tu peux leur attribuer des classes CSS
// .style et tout
// 
// 3ème étape : créer une animation CSS pour le loader (dans le fichier que je t'ai envoyé)
// 
// 4ème étape : faire en sorte que le loader s'affiche pendant 2 secondes avant de rediriger vers la page
// 
// 5ème étape : faire en sorte que le loader disparaisse quand la page est chargée

// === 1. Flèche de retour en haut ===
const scrollTopBtn = document.createElement('div');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '⬆';
scrollTopBtn.style.position = 'fixed';
scrollTopBtn.style.bottom = '40px';
scrollTopBtn.style.right = '40px';
scrollTopBtn.style.background = '#6ccda4';
scrollTopBtn.style.color = 'white';
scrollTopBtn.style.padding = '10px';
scrollTopBtn.style.borderRadius = '50%';
scrollTopBtn.style.fontSize = '20px';
scrollTopBtn.style.cursor = 'pointer';
scrollTopBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
scrollTopBtn.style.display = 'none'; // caché par défaut

document.body.appendChild(scrollTopBtn);

// Affichage du bouton quand on scrolle
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// Scroll vers le haut au clic
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// === 2. Alternance d'image sur clic ===
document.querySelectorAll('.toggle-img').forEach((img) => {
  img.addEventListener('click', () => {
    const current = img.getAttribute('src');
    const alt = img.getAttribute('data-alt');
    img.setAttribute('src', alt);
    img.setAttribute('data-alt', current);
  });
});


// === 3. Filtrage des produits ===
const filterForm = document.querySelector('#filter-form');
const productItems = document.querySelectorAll('.product-card');

if (filterForm) {
  filterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameValue = document.querySelector('#filter-name').value.toLowerCase();
    const themeValue = document.querySelector('#filter-theme').value;
    const minPrice = parseFloat(document.querySelector('#filter-min').value) || 0;
    const maxPrice = parseFloat(document.querySelector('#filter-max').value) || Infinity;

    productItems.forEach((item) => {
      const name = item.dataset.name.toLowerCase();
      const theme = item.dataset.theme;
      const price = parseFloat(item.dataset.price);

      const matchesName = name.includes(nameValue);
      const matchesTheme = themeValue === '' || theme === themeValue;
      const matchesPrice = price >= minPrice && price <= maxPrice;

      item.style.display = matchesName && matchesTheme && matchesPrice ? 'block' : 'none';
    });
  });
}
