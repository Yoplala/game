

/* -----===== Classe "Weapon" =====----- */


class Weapon {
    constructor (name, image, damages, classCss, position, type) {
		this.name = name;
        this.image = image;
        this.damages = damages;
		this.classCss = classCss;
		this.position = position;
		this.type = "weapon";
    }
	
	generateStartPosition() {	
		// méthode pour générer l'emplacement de départ
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
			startPosition.setAttribute("weapon", `${this.classCss}`)
		}
	}
	
	currentPosition() {
		// méthode pour calculer la position de l'arme
		if (this.position !== "Sur un joueur") {
		let cellElements = document.getElementsByClassName(`${this.classCss}`);
		let cellElement = cellElements[0];
		let x = cellElement.getAttribute("coordx");
		let y = cellElement.getAttribute("coordy");
		this.position = board[y][x];
		}
	}
}


/* Création des armes */

let weapon0 = new Weapon("Mains nues", "weapon0.png", 10);
let weapon1 = new Weapon("Lance-pierres", "weapon1.png", 13, "weapon1");
let weapon2 = new Weapon("Gourdin", "weapon2.png", 15, "weapon2");
let weapon3 = new Weapon("Épée", "weapon3.png", 17, "weapon3");
let weapon4 = new Weapon("Arbalète", "weapon4.png", 20, "weapon4");


/* Placement des armes */

weapon1.generateStartPosition()
weapon2.generateStartPosition()
weapon3.generateStartPosition()
weapon4.generateStartPosition()


/* Position des armes */

weapon1.currentPosition();
weapon2.currentPosition();
weapon3.currentPosition();
weapon4.currentPosition();