

/* -----===== Fonction pour gérer les déplacements =====----- */


function move(player) {
	let cellPlayer = player.position;
	// Cellule sur laquelle se trouve le joueur
	cellPlayer.style.outline = "1px red solid";
	let x = Number(cellPlayer.getAttribute("coordx"));
	let y = Number(cellPlayer.getAttribute("coordy"));
	let weaponOnTheRoadLeft1 = "";
	let weaponOnTheRoadLeft2 = "";
	let weaponOnTheRoadLeft3 = "";
	let weaponOnTheRoadRight1 = "";
	let weaponOnTheRoadRight2 = "";
	let weaponOnTheRoadRight3 = "";
	let weaponOnTheRoadBottom1 = "";
	let weaponOnTheRoadBottom2 = "";
	let weaponOnTheRoadBottom3 = "";
	let weaponOnTheRoadTop1 = "";
	let weaponOnTheRoadTop2 = "";
	let weaponOnTheRoadTop3 = "";
	let weaponLoot = "";
	let oldWeapon = player.weapon;


	/* Vérification des déplacements possibles et des armes sur le chemin */

	// Déplacements à droite
	for (let m = 1; m < 4; m++) {
	// Boucle sur 3 cellules
		let moveRight = board[y][x+m];
		if (moveRight) {
		// Si la cellule existe
			if (moveRight.getAttribute("type") === "character" || moveRight.getAttribute("type") === "blocked") {
			// Si la cellule est occupée par un joueur ou par un rocher la boucle s'arrête
				break;
			} else {
			// Sinon la cellule devient disponible pour un déplacement
				moveRight.classList.add("moveOK");
				moveRight.addEventListener('click', moveDone);
				// Ajout d'un événement au clic
				moveRight.setAttribute("direction", "right");
				moveRight.setAttribute("dirNum", m);
				if (moveRight.getAttribute("dirNum") === "1" && moveRight.getAttribute("type") === "weapon") {
				// Si la première cellule comprend une arme
					weaponOnTheRoadRight1 = moveRight.getAttribute("weapon");
					weaponOnTheRoadRight2 = moveRight.getAttribute("weapon");
					weaponOnTheRoadRight3 = moveRight.getAttribute("weapon");
				} else if (moveRight.getAttribute("dirNum") === "2" && moveRight.getAttribute("type") === "weapon") {
				// Si la deuxième cellule comprend une arme
					weaponOnTheRoadRight2 = moveRight.getAttribute("weapon");
					weaponOnTheRoadRight3 = moveRight.getAttribute("weapon");
				} else if (moveRight.getAttribute("dirNum") === "3" && moveRight.getAttribute("type") === "weapon") {
				// Si la troisième cellule comprend une arme
					weaponOnTheRoadRight3 = moveRight.getAttribute("weapon");
				}
			}
		}
	};

	// Déplacements à gauche
	for (let m = 1; m < 4; m++) {
		let moveLeft = board[y][x-m];
		if (moveLeft) {
			if (moveLeft.getAttribute("type") === "character" || moveLeft.getAttribute("type") === "blocked") {
				break;
			} else {
				moveLeft.classList.add("moveOK");
				moveLeft.addEventListener('click', moveDone);
				moveLeft.setAttribute("direction", "left");
				moveLeft.setAttribute("dirNum", m);
				if (moveLeft.getAttribute("dirNum") === "1" && moveLeft.getAttribute("type") === "weapon") {
					weaponOnTheRoadLeft1 = moveLeft.getAttribute("weapon");
					weaponOnTheRoadLeft2 = moveLeft.getAttribute("weapon");
					weaponOnTheRoadLeft3 = moveLeft.getAttribute("weapon");
				} else if (moveLeft.getAttribute("dirNum") === "2" && moveLeft.getAttribute("type") === "weapon") {
					weaponOnTheRoadLeft2 = moveLeft.getAttribute("weapon");
					weaponOnTheRoadLeft3 = moveLeft.getAttribute("weapon");
				} else if (moveLeft.getAttribute("dirNum") === "3" && moveLeft.getAttribute("type") === "weapon") {
					weaponOnTheRoadLeft3 = moveLeft.getAttribute("weapon");
				}
			}
		}
	};

	// Déplacements en haut
	for (let m = 1; m < 4; m++) {
		let moveTopOK = board[y-m]
		if (moveTopOK) {
		// Si la rangée existe
			let moveTop = board[y-m][x];
			if (moveTop) {
			// Si la cellule existe
				if (moveTop.getAttribute("type") === "character" || moveTop.getAttribute("type") === "blocked") {
					break;
				} else {
					moveTop.classList.add("moveOK");
					moveTop.addEventListener('click', moveDone);
					moveTop.setAttribute("direction", "top");
					moveTop.setAttribute("dirNum", m);
					if (moveTop.getAttribute("dirNum") === "1" && moveTop.getAttribute("type") === "weapon") {
						weaponOnTheRoadTop1 = moveTop.getAttribute("weapon");
						weaponOnTheRoadTop2 = moveTop.getAttribute("weapon");
						weaponOnTheRoadTop3 = moveTop.getAttribute("weapon");
					} else if (moveTop.getAttribute("dirNum") === "2" && moveTop.getAttribute("type") === "weapon") {
						weaponOnTheRoadTop2 = moveTop.getAttribute("weapon");
						weaponOnTheRoadTop3 = moveTop.getAttribute("weapon");
					} else if (moveTop.getAttribute("dirNum") === "3" && moveTop.getAttribute("type") === "weapon") {
						weaponOnTheRoadTop3 = moveTop.getAttribute("weapon");
					}
				}
			}
		};
	};

	// Déplacements en bas
	for (let m = 1; m < 4; m++) {
		let moveBottomOK = board[y+m]
		if (moveBottomOK) {
			let moveBottom = board[y+m][x];
			if (moveBottom) {
				if (moveBottom.getAttribute("type") === "character" || moveBottom.getAttribute("type") === "blocked") {
					break;
				} else {
					moveBottom.classList.add("moveOK");
					moveBottom.addEventListener('click', moveDone);
					moveBottom.setAttribute("direction", "bottom");
					moveBottom.setAttribute("dirNum", m);
					if (moveBottom.getAttribute("dirNum") === "1" && moveBottom.getAttribute("type") === "weapon") {
						weaponOnTheRoadBottom1 = moveBottom.getAttribute("weapon");
						weaponOnTheRoadBottom2 = moveBottom.getAttribute("weapon");
						weaponOnTheRoadBottom3 = moveBottom.getAttribute("weapon");
					} else if (moveBottom.getAttribute("dirNum") === "2" && moveBottom.getAttribute("type") === "weapon") {
						weaponOnTheRoadBottom2 = moveBottom.getAttribute("weapon");
						weaponOnTheRoadBottom3 = moveBottom.getAttribute("weapon");
					} else if (moveBottom.getAttribute("dirNum") === "3" && moveBottom.getAttribute("type") === "weapon") {
						weaponOnTheRoadBottom3 = moveBottom.getAttribute("weapon");
					}
				}
			}
		};
	};
	
	
	/* Déplacement en cours */
	
	function moveDone(e) {
	// Déclenchée par l'événement au clic sur les cellules valides pour un déplacement
		
		//Calcul du loot éventuel
		let direction = e.currentTarget.getAttribute("direction");
		let dirNum = e.currentTarget.getAttribute("dirNum");
		if (direction === "left" && dirNum === "1") {
			weaponLoot = weaponOnTheRoadLeft1;
		} else if (direction === "left" && dirNum === "2") {
			weaponLoot = weaponOnTheRoadLeft2;
		} else if (direction === "left" && dirNum === "3") {
			weaponLoot = weaponOnTheRoadLeft3;
		} else if (direction === "right" && dirNum === "1") {
			weaponLoot = weaponOnTheRoadRight1;
		} else if (direction === "right" && dirNum === "2") {
			weaponLoot = weaponOnTheRoadRight2;
		} else if (direction === "right" && dirNum === "3") {
			weaponLoot = weaponOnTheRoadRight3;
		} else if (direction === "top" && dirNum === "1") {
			weaponLoot = weaponOnTheRoadTop1;
		} else if (direction === "top" && dirNum === "2") {
			weaponLoot = weaponOnTheRoadTop2;
		} else if (direction === "top" && dirNum === "3") {
			weaponLoot = weaponOnTheRoadTop3;
		} else if (direction === "bottom" && dirNum === "1") {
			weaponLoot = weaponOnTheRoadBottom1;
		} else if (direction === "bottom" && dirNum === "2") {
			weaponLoot = weaponOnTheRoadBottom2;
		} else if (direction === "bottom" && dirNum === "3") {
			weaponLoot = weaponOnTheRoadBottom3;
		};

		switch (weaponLoot) {
				case "weapon1":
				// Si l'arme ramassée est celle-ci
					player.weapon = weapon1;
					// Elle devient l'arme du joueur
					deleteWeapon(weapon1);
					// Et on la supprime de la carte
					break;
				case "weapon2":
					player.weapon = weapon2;
					deleteWeapon(weapon2);
					break;
				case "weapon3":
					player.weapon = weapon3;
					deleteWeapon(weapon3);
					break;
				case "weapon4":
					player.weapon = weapon4;
					deleteWeapon(weapon4);
					break;
			};
		
		function deleteWeapon(e) {
		// Fonction pour supprimer l'arme ramassée sur la carte
			if (oldWeapon === weapon0) {
			// Si le joueur n'avait pas d'arme, la nouvelle arme est supprimée
				e.position.removeAttribute("weapon");
				e.position.removeAttribute("type");
				e.position.classList.remove(`${e.classCss}`);
				e.position = "Sur un joueur";
			} else {
			// Si le joueur avait une arme, celle-ci est déposée à la place de la nouvelle
				e.position.classList.remove(`${e.classCss}`);
				e.position.setAttribute("weapon", `${oldWeapon.classCss}`);
				e.position.classList.add(`${oldWeapon.classCss}`);
				oldWeapon.position = e.position;
				e.position = "Sur un joueur";
			}
		};
		
	/* Conséquences du déplacement */
	
		// Nettoyage de la case de départ
		if (cellPlayer.classList.contains("weapon1") || cellPlayer.classList.contains("weapon2") || cellPlayer.classList.contains("weapon3") || cellPlayer.classList.contains("weapon4")) {
			cellPlayer.setAttribute("type", "weapon");
		} else {
			cellPlayer.setAttribute("type", "");
		};
		cellPlayer.removeAttribute("id");
		cellPlayer.classList.remove(`${player.classCss}`);
		cellPlayer.style.outline = "";
		
		// Réglage de la nouvelle position
		e.currentTarget.classList.add(`${player.classCss}`);
		e.currentTarget.setAttribute("type", "character");
		e.currentTarget.setAttribute("id", `${player.classCss}`);	
		
		// Nettoyage des mouvements possibles
		document.querySelectorAll(".moveOK").forEach((cell) => {
					cell.removeEventListener('click', moveDone);
					cell.classList.remove("moveOK");
					cell.removeAttribute ("direction");
					cell.removeAttribute ("dirNum");
				});
		
		// On change le booléen pour signaler que le joueur a terminé de se déplacer
		player.moving = false;
		
		// On vérifie si c'est au tour de l'autre joueur ou si on entre en phase de combat (si les joueurs se touchent)
		let targetX = Number(e.currentTarget.getAttribute("coordx"));
		let targetY = Number(e.currentTarget.getAttribute("coordy"));
		let newPosition = board[targetX][targetY];

		let neighbouringCell1;
			if (targetX-1 < 0) {
				neighbouringCell1 = board[targetY][targetX];
			} else {
				neighbouringCell1 = board[targetY][targetX-1];
			}
		let neighbouringCell2;
			if (targetY-1 < 0) {
				neighbouringCell2 = board[targetY][targetX];
			} else {
				neighbouringCell2 = board[targetY-1][targetX];
			}
		let neighbouringCell3;
			if (targetX+1 >= lengthBoard) {
				neighbouringCell3 = board[targetY][targetX];
			} else {
				neighbouringCell3 = board[targetY][targetX+1];
			}
		let neighbouringCell4;
			if (targetY+1 >= lengthBoard) {
				neighbouringCell4 = board[targetY][targetX];
			} else {
				neighbouringCell4 = board[targetY+1][targetX];
			}
		
		if (player === character1) {
			if (neighbouringCell1.getAttribute("id") === "character2" || neighbouringCell2.getAttribute("id") === "character2" || neighbouringCell3.getAttribute("id") === "character2" || neighbouringCell4.getAttribute("id") === "character2") {
				character2.moving = false;
				player.attacking = true;
			} else {
			character2.moving = true;
			}
		} else if (player === character2) {
			if (neighbouringCell1.getAttribute("id") === "character1" || neighbouringCell2.getAttribute("id") === "character1" || neighbouringCell3.getAttribute("id") === "character1" || neighbouringCell4.getAttribute("id") === "character1") {
				character1.moving = false;
				player.attacking = true;
			} else {
			character1.moving = true;
			}
		}
		
		// On met à jour les positions des personnages et des armes
		weapon1.currentPosition();
		weapon2.currentPosition();
		weapon3.currentPosition();
		weapon4.currentPosition();
		character1.currentPosition();
		character2.currentPosition();
		
		// On met à jour les descriptions des personnages
		descriptionCharacter1.innerHTML = (character1.describe());
		descriptionCharacter2.innerHTML = (character2.describe());
		
		// On lance la fonction qui détermine quel personnage doit se déplacer
		whoIsMoving();
	};
};


