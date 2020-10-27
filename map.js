

/* -----===== Classe "Map" =====----- */


class Map {
	
	loadMap(){
	// Méthode pour générer la carte
        for (let i = 0 ; i < lengthBoard ; i++) {
			board[i] = new Array();
			board[i] = document.createElement("div");
			document.getElementById("plateau").appendChild(board[i]);
			board[i].classList.add("row");			
            for (let j = 0 ; j < lengthBoard ; j++) {
				board[i][j] = document.createElement("div");
				board[i].appendChild(board[i][j]);
				board[i][j].classList.add("cell");
				board[i][j].setAttribute("coordx", j);
				board[i][j].setAttribute("coordy", i);
            };
        };
		
		let rocks = Math.floor(lengthBoard * 2);
		// Génération des rochers
		for (let l = 0; l < rocks; l++) {
			let positionRock = board[Math.floor(Math.random() * (lengthBoard))][Math.floor(Math.random() * (lengthBoard))];
			if (positionRock.classList.contains("rocks")) {
				l--;
			} else {
				positionRock.classList.add("rocks");
				positionRock.setAttribute("type", "blocked");
			}
		}

    }	
}


/* Génération du plateau de jeu */

//let lengthBoard = Math.floor(Math.random() * (15 - 10 + 1) + 10);
let lengthBoard = Math.floor(Math.random() * (12 - 8 + 1) + 8);
let board = new Array();
let map = new Map();
map.loadMap();


/* Instructions de départ et bouton de regénération */

let instructions = document.getElementById('instructions');
instructions.innerHTML = "Le preu chevalier et le roi squelette ont décidé d'en finir l'un avec l'autre au cours d'un dernier combat ! <br><br> Vous pouvez lancer la partie ou regénérer la carte si un joueur ou une arme se trouve coincé.";

let regenerate = document.getElementById('bouton_reset');
// Événement au clic sur le bouton "Regénérer la carte"
regenerate.addEventListener('click', function() {
    history.go(0);
});            
// Pas trouvé de solution pour vérifier l'existence de "chemin" entre les personnages et les armes (exemple des labyrinthes).





