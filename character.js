

/* -----===== Classe "Character" =====----- */


class Character {
	constructor (name, image, classCss, weapon, health, position, type) {
		this.name = name;
		this.image = image;
		this.classCss = classCss;
		this.weapon = weapon;
		this.health = 100;
		this.position = position;
		//this.positionString = ${this.position};
		this.type = "character";
		this.moving = false;
		this.attacking = false;
		this.parrying = false;
	}
	
	generateStartPosition() {	
		// Méthode pour générer l'emplacement de départ
		let x = Math.floor(Math.random() * (lengthBoard)); 
		let y = Math.floor(Math.random() * (lengthBoard));
		let startPosition = board[x][y];
		
		let neighbouringCell1;
			if (x-1 < 0) {
				neighbouringCell1 = board[x][y];
			} else {
				neighbouringCell1 = board[x-1][y];
			}
		let neighbouringCell2;
			if (y-1 < 0) {
				neighbouringCell2 = board[x][y];
			} else {
				neighbouringCell2 = board[x][y-1];
			}
		let neighbouringCell3;
			if (x+1 >= lengthBoard) {
				neighbouringCell3 = board[x][y];
			} else {
				neighbouringCell3 = board[x+1][y];
			}
		let neighbouringCell4;
			if (y+1 >= lengthBoard) {
				neighbouringCell4 = board[x][y];
			} else {
				neighbouringCell4 = board[x][y+1];
			}

		if (board[x][y].getAttribute("type") === "character" ||board[x][y].getAttribute("type") === "weapon" || board[x][y].getAttribute("type") === "blocked") {
			this.generateStartPosition();
		} else if (neighbouringCell1.getAttribute("type") === "character" || neighbouringCell2.getAttribute("type") === "character" || neighbouringCell3.getAttribute("type") === "character" ||neighbouringCell4.getAttribute("type") === "character" || neighbouringCell1.getAttribute("type") === "weapon" || neighbouringCell2.getAttribute("type") === "weapon" || neighbouringCell3.getAttribute("type") === "weapon" || neighbouringCell4.getAttribute("type") === "weapon" || neighbouringCell1.getAttribute("type") === "blocked" || neighbouringCell2.getAttribute("type") === "blocked" || neighbouringCell3.getAttribute("type") === "blocked" || neighbouringCell4.getAttribute("type") === "blocked") {
			this.generateStartPosition();
		} else {
			startPosition.classList.add(`${this.classCss}`);
			startPosition.setAttribute("type", `${this.type}`);
			startPosition.setAttribute("id", `${this.classCss}`)
		}
	}
	
	currentPosition() {
		// Méthode pour calculer la position du personnage
		let cellElement = document.getElementById(`${this.classCss}`);
		let x = cellElement.getAttribute("coordx");
		let y = cellElement.getAttribute("coordy");
		this.position = board[y][x];
	}

	describe() {	
		// Méthode pour générer/mettre à jour la barre de vie et la description du personnage
		$(function() {
		  $('progress[id="vie_joueur1"]').attr('value', Number(character1.health));
		  $('progress[id="vie_joueur2"]').attr('value', Number(character2.health)); 
		});
		return `<p>Santé : ${this.health} points de vie <br> Arme : ${this.weapon.name} <img src="${this.weapon.image}" alt="" style="height: 15px;"> <br> Dégâts : ${this.weapon.damages}</p>`;
	}
	
}


/* Création des personnages */

let character1 = new Character("Preu chevalier", "Knight Idle.gif", "character1", weapon0);
let character2 = new Character("Roi squelette", "Skeleton Idle.gif", "character2", weapon0);


/* Placement des personnages */

character1.generateStartPosition()
character2.generateStartPosition()


/* Position des personnages */

character1.currentPosition();
character2.currentPosition();


/* Description des personnages */

let descriptionCharacter1 = document.getElementById('description_joueur1');
descriptionCharacter1.innerHTML = (character1.describe());
let descriptionCharacter2 = document.getElementById('description_joueur2');
descriptionCharacter2.innerHTML = (character2.describe());


/* Image des personnages */

let imageCharacter1 = document.getElementById('image_joueur1');
imageCharacter1.innerHTML = `<img src="${character1.image}">`;
let imageCharacter2 = document.getElementById('image_joueur2');
imageCharacter2.innerHTML = `<img src="${character2.image}">`;

