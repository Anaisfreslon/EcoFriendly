// =======================
// TITRE DYNAMIQUE SELON LA PAGE
// =======================

// On récupère d'abord le titre actuel de la page dans une variable
let pageTitle = document.title;

// On regarde dans l'URL actuelle (le chemin de la page) quel mot-clé est présent
// En fonction du mot-clé, on change dynamiquement le titre affiché dans l'onglet du navigateur

// Si l'URL contient "index"
if (window.location.pathname.includes("index")) {
  // On modifie le titre pour "Accueil | Startup EcoFriendly"
  document.title = "Accueil | Startup EcoFriendly";

  // Sinon, si l'URL contient "apropos"
} else if (window.location.pathname.includes("à propos")) {
  // On met le titre "A propos | Startup EcoFriendly"
  document.title = "A propos | Startup EcoFriendly";

  // Sinon, si l'URL contient "equipe"
} else if (window.location.pathname.includes("equipe")) {
  // Le titre devient "Présentation de l'équipe | Startup EcoFriendly"
  document.title = "Présentation de l'équipe | Startup EcoFriendly";

  // Sinon, si l'URL contient "produits"
} else if (window.location.pathname.includes("produits")) {
  // Le titre devient "Produits et services | Startup EcoFriendly"
  document.title = "Produits et services | Startup EcoFriendly";

  // Sinon, si l'URL contient "contact"
} else if (window.location.pathname.includes("contact")) {
  // Le titre devient "Contact | Startup EcoFriendly"
  document.title = "Contact | Startup EcoFriendly";
}

// =======================
// GESTION DE LA COPIE DU NUMÉRO DE TÉLÉPHONE
// =======================

// On sélectionne le premier élément HTML qui a la classe "phone-number"
// Cet élément contient le numéro de téléphone affiché sur la page
const phoneNumberElement = document.querySelector(".phone-number");

// On vérifie que cet élément existe bien sur la page (sinon le reste ne sert à rien)
if (phoneNumberElement) {
  // Quand l'utilisateur essaye de copier le numéro (événement 'copy' sur l'élément)
  phoneNumberElement.addEventListener("copy", function (e) {
    // On empêche la copie automatique classique (empêche le comportement par défaut)
    e.preventDefault();

    // On récupère le contenu texte (le numéro) de l'élément
    let number = phoneNumberElement.textContent;

    // On demande à l'utilisateur de taper à nouveau le numéro pour confirmer qu'il souhaite bien appeler ce numéro
    // Cela évite les copies accidentelles ou automatiques
    let userInput = prompt(
      `Si vous voulez appeler ce numéro : ${number}, entrez-le de nouveau dans le champ ci-dessous puis validez`
    );

    // Si l'utilisateur a bien retapé le numéro correctement
    if (userInput === number) {
      // On affiche dans la console un message indiquant que l'utilisateur appelle ce numéro
      console.log(`Vous appelez ce numéro : ${number}`);

      // On lance la fonction playRingtone pour jouer une sonnerie
      playRingtone();
    } else {
      // Sinon (si le numéro tapé est différent), on affiche une alerte pour prévenir l'utilisateur que c'est incorrect
      alert("Le numéro entré est incorrect.");
    }
  });

  // Cet événement se déclenche quand l'utilisateur relâche le bouton de la souris après avoir sélectionné un texte sur l'élément
  phoneNumberElement.addEventListener("mouseup", () => {
    // On ajoute un écouteur global sur la page qui détecte la copie (événement 'copy')
    document.addEventListener("copy", (e) => {
      // On empêche la copie automatique par défaut
      e.preventDefault();

      // On récupère le texte sélectionné par l'utilisateur sur la page
      let text = window.getSelection().toString();

      // Si le texte sélectionné contient le numéro de téléphone affiché
      if (text.includes(phoneNumberElement.textContent)) {
        // On déclenche manuellement l'événement 'copy' sur l'élément phoneNumberElement
        // Ce qui va lancer la logique de vérification et de prompt vue juste au-dessus
        phoneNumberElement.dispatchEvent(new Event("copy"));
      }
    });
  });
}

// =======================
// FONCTION POUR JOUER UNE SONNERIE PENDANT 5 SECONDES
// =======================

function playRingtone() {
  // On crée un nouvel objet Audio qui va lire un fichier sonore en ligne
  let audio = new Audio("https://www.soundjay.com/button/beep-07.mp3");

  // On met la lecture en boucle (le son va se répéter)
  audio.loop = true;

  // On lance la lecture du son
  audio.play();

  // Après 5 secondes, on arrête la lecture de la sonnerie
  setTimeout(() => {
    audio.pause();
  }, 5000);
}

// =======================
// JOUER UN SON AU CLIC SUR LE NUMÉRO DE TÉLÉPHONE
// =======================

// On sélectionne tous les éléments de la page qui ont la classe 'phone-number'
// (il peut y en avoir plusieurs)
const phoneNumbers = document.querySelectorAll(".phone-number");

// On récupère l'élément audio caché dans la page qui contient le son à jouer lors du clic
const sound = document.getElementById("clickSound");

// Pour chaque numéro de téléphone, on ajoute un événement au clic
phoneNumbers.forEach((num) => {
  num.addEventListener("click", () => {
    // Quand on clique, on remet le son au début (au cas où il a déjà joué)
    sound.currentTime = 0;

    // On joue le son de clic
    sound.play();
  });
});

// =======================
// CODE REDONDANT POUR JOUER UN AUTRE SON AU CLIC (PEUT-ÊTRE INUTILE)
// =======================

document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne à nouveau tous les numéros (redondant avec plus haut)
  const phoneNumbers = document.querySelectorAll(".phone-number");

  // Sélectionne un autre élément audio avec l'ID 'click-sound' (différent du précédent)
  const clickSound = document.getElementById("click-sound");

  // Pour chaque numéro, on ajoute un événement clic pour jouer ce son
  phoneNumbers.forEach((number) => {
    number.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
});
