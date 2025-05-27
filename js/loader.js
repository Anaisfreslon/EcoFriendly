// Quand la page est complètement chargée
window.addEventListener("DOMContentLoaded", function () {
  // On récupère le loader (la boîte qui s'affiche avec la note)
  var loader = document.getElementById("loader");

  // On sélectionne uniquement les liens avec la classe "delayed-link"
  var links = document.querySelectorAll("a.delayed-link");

  // Pour chaque lien concerné
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // On récupère le lien vers lequel on veut aller
      var destination = link.getAttribute("href");

      // Si ce n'est pas un lien valide, on ne fait rien
      if (
        !destination || // lien vide
        destination.startsWith("#") || // ancre interne
        destination.startsWith("mailto:") || // lien email
        destination.startsWith("tel:") // lien téléphone
      ) {
        return; // on laisse le comportement normal
      }

      // On empêche d'aller vers la page immédiatement
      event.preventDefault();

      // On affiche le loader (en flex pour le centrer)
      loader.style.display = "flex";

      // Après 2 secondes, on redirige vers la vraie page
      setTimeout(function () {
        window.location.href = destination;
      }, 2000);
    });
  });
});
