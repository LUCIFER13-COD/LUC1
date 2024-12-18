// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 10
};

let enemy = {
    x: Math.random() * (canvas.width - 50),
    y: 0,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5
};

let score = 0;
let gameRunning = true;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

function detectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function updateEnemy() {
    enemy.y += enemy.speed;
    if (enemy.y > canvas.height) {
        enemy.x = Math.random() * (canvas.width - enemy.width);
        enemy.y = 0;
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
    }
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

    updateEnemy();

    if (detectCollision(player, enemy)) {
        gameRunning = false;
        alert('Game Over!');
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
