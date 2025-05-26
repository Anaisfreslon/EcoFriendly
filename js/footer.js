// =======================
// Titre dynamique selon la page
// =======================
let pageTitle = document.title;
if (window.location.pathname.includes("index")) {
  document.title = "Accueil | Startup EcoFriendly";
} else if (window.location.pathname.includes("apropos")) {
  document.title = "A propos | Startup EcoFriendly";
} else if (window.location.pathname.includes("equipe")) {
  document.title = "Présentation de l'équipe | Startup EcoFriendly";
} else if (window.location.pathname.includes("produits")) {
  document.title = "Produits et services | Startup EcoFriendly";
} else if (window.location.pathname.includes("contact")) {
  document.title = "Contact | Startup EcoFriendly";
}

// =======================
// Gestion du numéro copié
// =======================
const phoneNumberElement = document.querySelector(".phone-number");

if (phoneNumberElement) {
  phoneNumberElement.addEventListener("copy", function(e) {
    e.preventDefault();
    let number = phoneNumberElement.textContent;
    let userInput = prompt(`Si vous voulez appeler ce numéro : ${number}, entrez-le de nouveau dans le champ ci-dessous puis validez`);
    if (userInput === number) {
      console.log(`Vous appelez ce numéro : ${number}`);
      playRingtone();
    } else {
      alert("Le numéro entré est incorrect.");
    }
  });

  phoneNumberElement.addEventListener("mouseup", () => {
    document.addEventListener("copy", (e) => {
      e.preventDefault();
      let text = window.getSelection().toString();
      if (text.includes(phoneNumberElement.textContent)) {
        phoneNumberElement.dispatchEvent(new Event("copy"));
      }
    });
  });
}

// =======================
// Sonnerie pendant 5 secondes
// =======================
function playRingtone() {
  let audio = new Audio("https://www.soundjay.com/button/beep-07.mp3");
  audio.loop = true;
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 5000);
}

// Sonnerie au clic sur le numéro
const phoneNumbers = document.querySelectorAll('.phone-number');
const sound = document.getElementById('clickSound');

phoneNumbers.forEach(num => {
  num.addEventListener('click', () => {
    sound.currentTime = 0;
    sound.play();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const phoneNumbers = document.querySelectorAll('.phone-number');
  const clickSound = document.getElementById('click-sound');

  phoneNumbers.forEach(number => {
    number.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
});

