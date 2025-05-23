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

// Affiche le loader pendant 2 secondes au chargement de la page
window.addEventListener("load", function () {
  var loader = document.getElementById("loader");

  // Affiche le loader (au cas où il était caché)
  loader.style.display = "flex";

  // Masque le loader après 2 secondes
  setTimeout(function () {
    loader.style.display = "none";
  }, 2000);
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
