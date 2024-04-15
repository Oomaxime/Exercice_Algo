/**GOAL :
Vous décidez de participer à des concours avec comme gain des sommes d'argent.

Vous savez que :

- Par jour il n'y a qu'un seul concours
- Les concours sont consécutifs
- Tous les concours ne rapport pas la même somme
- Il y a N concours consécutifs
- Les concours commencent toujours le 1

Vous voudriez gagner un maximum en participant à tous les concours possible seulement au bout de X concours consécutifs vous êtes fatigué et vous vous reposez un jour.

Ecrivez un programme qui affiche les gains maximum en respectant les règles au-dessus.

**Exemple:**

Il y a 10 concours

Vous pouvez jouer 4 concours consécutifs

Les gains possibles sont 13, 2, 15, 17, 19, 33, 2, 2, 2, 2.

Donc, vous jouerez les jours :  **1** > **3** > **4** > **5** > **6** > **8** > **9** > **10**

Ainsi, vous gagnerez 103 💵*/

//FUNCTION PRINCIPALE

function getGain(listeGains, nbrWorkday) {
  let cursor = 0;
  let stopLoop = false;
  let gain = 0;

  function min(liste, minimum) {
    for (let i = liste.length - 1; i >= 0; i--) {
      if (minimum[1] > liste[i]) {
        minimum = [true, liste[i]];
      }
    }
    return minimum;
  }

  while (stopLoop == false) {
    let minimum = [false, listeGains[cursor + nbrWorkday]];

    if (cursor >= listeGains.length - nbrWorkday) {
      for (let i = cursor; i < listeGains.length; i++) {
        gain += listeGains[i];
      }
      stopLoop = true;
    } else {
      let bubble = [];
      for (let i = cursor; i < nbrWorkday + cursor; i++) {
        bubble.push(listeGains[i]);
      }
      let myMin = min(bubble, minimum);
      if (myMin[0] == true) {
        for (const value of bubble) {
          if (value != myMin[1]) {
            gain += value;
          } else {
            cursor++;
            break;
          }
          cursor++;
        }
      } else {
        for (const value of bubble) {
          gain += value;
          cursor++;
        }
        cursor++;
      }
    }
  }
  console.log("Maximum de gain possible = " + gain + "€");
}

//INITIALISATION DES CONDITIONS

let nbrConcours = Math.floor(Math.random() * 10) + 4; // génére le nombre de concours
let nbrWorkday = Math.floor(Math.random() * (nbrConcours - 1)) + 1; // généré un nombre de jours maximum strictement inférieur au nombre de concours
let listeGains = [];
let day = 1; //sert pour les console.log plus bas

//remplis la liste des gains
for (let i = 0; i < nbrConcours; i++) {
  listeGains.push(Math.floor(Math.random() * 100) + 1);
}

console.log(
  "Pour ce tournois, les candidats participerons à " +
    nbrConcours +
    " concours.\nChaque concours permet de gagner respectivement les sommes suivantes : ",
);
for (const value of listeGains) {
  console.log("Jours " + day + ": " + value + "€");
  day++;
}
console.log(
  "Chaque concurrent pourras participer " +
    nbrWorkday +
    " jour d'affiler. Une fois cette limite atteinte,  il est soumis à un jours de repos obligatoire ! \n",
);

getGain(listeGains, nbrWorkday);
