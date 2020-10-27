

/* -----===== Fonction pour gérer le combat =====----- */


function attack(player) {
	let cellPlayer = player.position;
	cellPlayer.style.outline = "1px red solid";

	let fight;
	let block;
	
	/*if (player === character1) {
		fight = document.getElementById('bouton_attaquer');
		block = document.getElementById('bouton_parer');
		fight.addEventListener('click', strike);
		block.addEventListener('click', dodge);
	} else if (player === character2) {
		fight = document.getElementById('attaquer2');
		block = document.getElementById('parer2');
		fight.addEventListener('click', strike);
		block.addEventListener('click', dodge);
	}*/
	fight = document.getElementById('bouton_attaquer');
	block = document.getElementById('bouton_parer');
	fight.addEventListener('click', strike);
	block.addEventListener('click', dodge);


	function strike() {
		let currentDamages = 0;
		$(function(){
			$('#dégats_joueur1').text("");
			$('#dégats_joueur2').text("");
		});
	
		if (player === character1) {
			if (character2.parrying === true) {
				character2.health = character2.health - (player.weapon.damages / 2);
				currentDamages = player.weapon.damages / 2;
				character2.parrying = false;
				$(function(){
					$('#dégats_joueur2').text("- " + currentDamages);
					$('#dégats_joueur2').css({'color': 'red', 'font-size': '20px'});
					$("#dégats_joueur2").animate({fontSize:"40px"}, 500);
					
				});
			} else {
				character2.health = character2.health - player.weapon.damages;
				currentDamages = player.weapon.damages;
				$(function(){
					$('#dégats_joueur2').text("- " + currentDamages);
					$('#dégats_joueur2').css({'color': 'red', 'font-size': '20px'});
					$("#dégats_joueur2").animate({fontSize:"40px"}, 500);
				});
			}
		} else if (player === character2) {
			if (character1.parrying === true) {
				character1.health = character1.health - (player.weapon.damages / 2);
				currentDamages = player.weapon.damages / 2;
				$(function(){
					$('#dégats_joueur1').text("- " + currentDamages);
					$('#dégats_joueur1').css({'color': 'red', 'font-size': '20px'});
					$("#dégats_joueur1").animate({fontSize:"40px"}, 500);
				});
				character1.parrying = false;
			} else {
				character1.health = character1.health - player.weapon.damages;
				currentDamages = player.weapon.damages;
				$(function(){
					$('#dégats_joueur1').text("- " + currentDamages);
					$('#dégats_joueur1').css({'color': 'red', 'font-size': '20px'});
					$("#dégats_joueur1").animate({fontSize:"40px"}, 500);
				});
			}
		}
		
		
		
		player.attacking = false;
		
		if (character1.health <= 0 || character2.health <= 0) {
			endGame();
		} else {
			if (player === character1) {
				character2.attacking = true;
			} else if (player === character2) {
				character1.attacking = true;
			}
			whoIsAttacking();
		}

		fight.removeEventListener('click', strike);
		block.removeEventListener('click', dodge);
		descriptionCharacter1.innerHTML = (character1.describe());
		descriptionCharacter2.innerHTML = (character2.describe());
		cellPlayer.style.outline = "";
	};
	
	function dodge() {
		player.parrying = true;
		player.attacking = false;
		
		if (player === character1) {
			character2.attacking = true;
		} else if (player === character2) {
			character1.attacking = true;
		}
		
		fight.removeEventListener('click', strike);
		block.removeEventListener('click', dodge);
		
		whoIsAttacking();
	};
	
	
};