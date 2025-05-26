const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');

const fullnameError = document.getElementById('fullname-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

function validateForm() {
  let valid = true;

  // Nom : 2 mots séparés d’un espace
  if (!/^\w+\s\w+$/.test(fullname.value.trim())) {
    fullnameError.textContent = "Veuillez entrer votre prénom et nom.";
    valid = false;
  } else {
    fullnameError.textContent = "";
  }

  // Email : doit contenir @ et un .
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email.value.trim())) {
    emailError.textContent = "Veuillez entrer un email valide.";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  // Message : entre 20 et 1000 caractères
  const msgLength = message.value.trim().length;
  if (msgLength < 20 || msgLength > 1000) {
    messageError.textContent = "Le message doit contenir entre 20 et 1000 caractères.";
    valid = false;
  } else {
    messageError.textContent = "";
  }

  submitBtn.disabled = !valid;
}

fullname.addEventListener('input', validateForm);
email.addEventListener('input', validateForm);
message.addEventListener('input', validateForm);
