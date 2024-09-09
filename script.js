const player = document.getElementById('player');
const dialogue = document.getElementById('dialogue');
const attackButton = document.getElementById('attack-button');
const playerBox = document.getElementById('player-box');

let isBattleActive = false;

function startAttackSequence() {
    dialogue.textContent = "Sans lanza huesos...";
    spawnProjectile();
}

function spawnProjectile() {
    const projectile = document.createElement('div');
    projectile.classList.add('projectile');
    playerBox.appendChild(projectile);

    let pos = 300;
    const interval = setInterval(() => {
        pos -= 5;
        projectile.style.top = ${pos}px;
        
        // Chequeo de colisión
        if (pos < 20 && pos > 0 && checkCollision(player, projectile)) {
            dialogue.textContent = "¡Has sido golpeado!";
            clearInterval(interval);
            playerBox.removeChild(projectile);
            isBattleActive = false;
        }

        // Cuando el proyectil sale del área
        if (pos <= 0) {
            clearInterval(interval);
            playerBox.removeChild(projectile);
        }
    }, 50);
}

function checkCollision(player, projectile) {
    const playerRect = player.getBoundingClientRect();
    const projectileRect = projectile.getBoundingClientRect();
    
    return !(
        playerRect.top > projectileRect.bottom ||
        playerRect.bottom < projectileRect.top ||
        playerRect.right < projectileRect.left ||
        playerRect.left > projectileRect.right
    );
}

attackButton.addEventListener('click', () => {
    if (!isBattleActive) {
        isBattleActive = true;
        startAttackSequence();
    }
});
