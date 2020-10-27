

/* -----===== Déroulement de la partie =====----- */


let begin = document.getElementById('bouton_go');
// Événement au clic sur le bouton "Démarer la partie"
begin.addEventListener('click', function() {
	
	instructions.innerHTML = "Déplacez-vous d'une à trois cases dans la direction de votre choix. <br><br> Si vous croisez une arme sur votre chemin, vous vous en équiperez automatiquement. <br><br> Si les deux joueurs se retrouvent sur des cases adjacentes, le combat commence !";

	let first = Math.floor(Math.random() * (2));
	// Détermine aléatoirement le joueur qui commence
		if (first === 0) {
			character1.moving = true;
		} else {

			character2.moving = true;
		}; 
		
	whoIsMoving();	
});

$(function(){
    //Permet de cacher le titre au début de la partie
    $("#bouton_go").click(function(){
        $("h1").slideUp();
    });
});
	
function whoIsMoving() {
// Permet le déplacement en boucle des joueurs via un booléen
	if (character1.moving === true) {
		move(character1);
		instructions_joueur.style.display = "block";
		instructions_joueur.textContent = "C'est au tour du preu chevalier de jouer !";
		character1.image = "Knight Run.gif";
		character2.image = "Skeleton Idle.gif";
		imageCharacter1.innerHTML = `<img src="${character1.image}">`;
		imageCharacter2.innerHTML = `<img src="${character2.image}">`;
	} else if (character2.moving === true) {
		move(character2);
		instructions_joueur.style.display = "block";
		instructions_joueur.textContent = "C'est au tour du roi squelette de jouer !";
		character1.image = "Knight Idle.gif";
		character2.image = "Skeleton Walk.gif";
		imageCharacter1.innerHTML = `<img src="${character1.image}">`;
		imageCharacter2.innerHTML = `<img src="${character2.image}">`;
	} else {
	// Démarre la phase de combat
		instructions.innerHTML = "<p style= color:red;>Le combat à mort a commencé !<br></p><p>À chaque tour, vous pouvez attaquer ou vous défendre.<br><br>Attaquer : inflige les dégâts de l'arme.<br>Parer : diminue de moitié les dégâts du prochain coup.</p>";
		whoIsAttacking();
	}
};


function whoIsAttacking() {
// Permet l'attaque en boucle entre les joueurs via un booléen
	if (character1.attacking === true) {
		attack(character1);
		instructions_joueur.style.display = "block";
		instructions_joueur.textContent = "C'est au tour du preu chevalier de jouer !";
		bouton_attaquer.style.display = "block";
		bouton_parer.style.display = "block";
		character1.image = "Knight Attack.gif";
		character2.image = "Skeleton Idle.gif";
		imageCharacter1.innerHTML = `<img src="${character1.image}">`;
		imageCharacter2.innerHTML = `<img src="${character2.image}">`;
	} else if (character2.attacking === true) {
		attack(character2);
		instructions_joueur.style.display = "block";
		instructions_joueur.textContent = "C'est au tour du roi squelette de jouer !";
		bouton_attaquer.style.display = "block";
		bouton_parer.style.display = "block";
		character1.image = "Knight Idle.gif";
		character2.image = "Skeleton Attack.gif";
		imageCharacter1.innerHTML = `<img src="${character1.image}">`;
		imageCharacter2.innerHTML = `<img src="${character2.image}">`;
	}
};

function endGame() {
// Met fin à la partie
		if (character1.health <= 0) {
			instructions.innerHTML = "<p style= color:red;>Game over !<br></p><p>Le roi squelette remporte la victoire !</p>";
			character1.image = "Knight Dead.gif";
			imageCharacter1.innerHTML = `<img src="${character1.image}">`;
		} else {
			instructions.innerHTML = "<p style= color:red;>Game over !<br></p><p>Le preu chevalier remporte la victoire !</p>";
			character2.image = "Skeleton Dead.gif";
			imageCharacter2.innerHTML = `<img src="${character2.image}">`;
		}
}



