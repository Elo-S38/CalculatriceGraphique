document.addEventListener("DOMContentLoaded", function () {
  //DOMContentLoaded signifie que le code s'exécute seulement une fois la page chargée.
  const screen = document.getElementById("screen"); //variable qui va contenir ce que l'utilisateur tape
  let firstNumber = "";
  let secondNumber = "";
  let isSecond = false; // Indique si on tape le 2e nombre

  function updateScreen() {
    //Mis a jour du texte de l'ecran
    screen.textContent = firstNumber + (isSecond ? "+" + secondNumber : ""); //operateur ternaire: Si "isSecond est true → On affiche "+" suivi de secondNumber. sinon on affiche rien ""
  }

  function handleClick(event) {
    const value = event.target.value; //event.target représente le bouton cliqué. Et event.target.value récupère le texte du bouton

    if (!isNaN(value)) {
      // Si c'est un chiffre
      if (isSecond) {
        secondNumber += value;
        //Si isSecond == true → On tape secondNumber. isSecond = true active la saisie du secondNumber.
      } else {
        firstNumber += value;
        //Sinon (isSecond == false) → On tape firstNumber.
      }
    } else if (value === "+") {
      // Si on appuie sur "+"
      if (firstNumber && !isSecond) {
        //firstNumber → Vérifie qu'un nombre a été saisi avant d'appuyer sur +.Si firstNumber est vide, cela signifie qu'on essaie d'appuyer sur + sans nombre avant → On ignore le clic.
        // !isSecond → Vérifie que l'on n'a pas déjà appuyé sur + avant.
        // Si isSecond est déjà true, on n'autorise pas un deuxième + pour éviter une saisie incorrecte.
        isSecond = true;
        // On ne peut appuyer sur + que si on a déjà un premier nombre (firstNumber).
        //Cette ligne indique que nous avons appuyé sur + et que nous devons maintenant saisir le secondNumber. Cela signifie que le prochain chiffre tapé sera stocké dans secondNumber.
      }
    } else if (value === "=") {
      // Si on appuie sur "="
      calculateResult();
      // On appelle la fonction calculateResult(), qui va faire le calcul et afficher le résultat.
    }
    updateScreen();
    // updateScreen() est juste appelée quand on clique sur un bouton, mais elle ne s'auto-appelle jamais (donc non recursive)
  }

  function calculateResult() {
    if (!firstNumber || !secondNumber) return;
    // !firstNumber → Vérifie si firstNumber est vide ("") ou null.!secondNumber → Vérifie si secondNumber est vide ("") ou null. Si l’un des deux est vide, la fonction s’arrête immédiatement (return) pour éviter une erreur.

    let result = Number(firstNumber) + Number(secondNumber);
    firstNumber = result.toString();
    secondNumber = ""; //On efface secondNumber, car le calcul est terminé.
    isSecond = false; //On repasse isSecond à false, car on doit repartir sur une nouvelle saisie.
    updateScreen(); //On appelle updateScreen() pour afficher le nouveau firstNumber (le résultat du calcul). L’écran affichera maintenant le résultat au lieu de l’ancienne opération.
  }

  document.querySelectorAll("input[type=button]").forEach((button) => {
    button.addEventListener("click", handleClick);
    // Ajoute un événement click à chaque bouton
    // document.querySelectorAll("input[type=button]") → Sélectionne tous les boutons.
    //.forEach((button) => { ... }) → Pour chaque bouton, on exécute du code.
    //button.addEventListener("click", handleClick); → Quand on clique sur un bouton, on appelle handleClick().
  });
});
