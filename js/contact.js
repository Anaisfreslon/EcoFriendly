// =======================
// SÉLECTION DES ÉLÉMENTS DU FORMULAIRE
// =======================

// On récupère le champ du nom complet (prénom + nom)
const fullname = document.getElementById("fullname");

// On récupère le champ de l'email
const email = document.getElementById("email");

// On récupère le champ du message (textarea)
const message = document.getElementById("message");

// On récupère le bouton d'envoi du formulaire
const submitBtn = document.getElementById("submit-btn");

// On récupère les éléments où on affichera les messages d'erreur pour chaque champ
const fullnameError = document.getElementById("fullname-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

// =======================
// FONCTION DE VALIDATION DU FORMULAIRE
// =======================

function validateForm() {
  // On commence en considérant que le formulaire est valide
  let valid = true;

  // -----------------------
  // Validation du nom complet
  // -----------------------
  // On teste si le champ fullname contient deux mots séparés par au moins un espace
  // Le regex /^\w+\s\w+$/ signifie :
  // - ^ = début de la chaîne
  // - \w+ = un ou plusieurs caractères alphanumériques (lettres, chiffres, underscore)
  // - \s = un espace
  // - \w+ = un ou plusieurs caractères alphanumériques
  // - $ = fin de la chaîne
  // Cela oblige donc à avoir "Prénom Nom" sans caractères spéciaux
  if (!/^\w+\s\w+$/.test(fullname.value.trim())) {
    // Si le format ne correspond pas, on affiche un message d'erreur sous le champ
    fullnameError.textContent = "Veuillez entrer votre prénom et nom.";
    // On indique que le formulaire n'est pas valide
    valid = false;
  } else {
    // Sinon on efface le message d'erreur
    fullnameError.textContent = "";
  }

  // -----------------------
  // Validation de l'email
  // -----------------------
  // On teste si l'email contient bien un caractère '@' suivi d'un '.' (simple validation)
  // Le regex /^[^@]+@[^@]+\.[^@]+$/ signifie :
  // - ^ = début de la chaîne
  // - [^@]+ = un ou plusieurs caractères qui ne sont pas '@'
  // - @ = un caractère '@'
  // - [^@]+ = un ou plusieurs caractères qui ne sont pas '@'
  // - \. = un point littéral '.'
  // - [^@]+ = un ou plusieurs caractères qui ne sont pas '@'
  // - $ = fin de la chaîne
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email.value.trim())) {
    // Si la condition n'est pas respectée, message d'erreur
    emailError.textContent = "Veuillez entrer un email valide.";
    valid = false;
  } else {
    // Sinon on efface le message d'erreur
    emailError.textContent = "";
  }

  // -----------------------
  // Validation du message
  // -----------------------
  // On calcule la longueur du message sans espaces superflus au début et fin
  const msgLength = message.value.trim().length;

  // On vérifie que la longueur est entre 20 et 1000 caractères
  if (msgLength < 20 || msgLength > 1000) {
    // Si trop court ou trop long, message d'erreur
    messageError.textContent =
      "Le message doit contenir entre 20 et 1000 caractères.";
    valid = false;
  } else {
    // Sinon on efface le message d'erreur
    messageError.textContent = "";
  }

  // -----------------------
  // Activation ou désactivation du bouton d'envoi
  // -----------------------
  // Si tous les champs sont valides, on active le bouton, sinon on le désactive
  submitBtn.disabled = !valid;
}

// =======================
// ÉCOUTE DES ÉVÉNEMENTS SUR LES CHAMPS POUR VALIDATION EN DIRECT
// =======================

// Dès que l'utilisateur modifie le champ fullname, on appelle validateForm pour vérifier la validité
fullname.addEventListener("input", validateForm);

// Idem pour le champ email
email.addEventListener("input", validateForm);

// Idem pour le champ message
message.addEventListener("input", validateForm);
