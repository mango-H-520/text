const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreValue = document.getElementById('scoreValue');

const blockSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let fruit = { x: Math.floor(Math.random() * (canvas.width / blockSize)), y: Math.floor(Math.random() * (canvas.height / blockSize)) };
let score = 0;
let gameInterval;

function drawHeart(x, y) {
    ctx.beginPath();
    ctx.moveTo(x * blockSize + blockSize / 2, y * blockSize + blockSize / 6);
    ctx.bezierCurveTo(
        x * blockSize + blockSize / 6, y * blockSize,
        x * blockSize, y * blockSize + blockSize / 3,
        x * blockSize + blockSize / 2, y * blockSize + 5 * blockSize / 6
    );
    ctx.bezierCurveTo(
        x * blockSize + blockSize, y * blockSize + blockSize / 3,
        x * blockSize + 5 * blockSize / 6, y * blockSize,
        x * blockSize + blockSize / 2, y * blockSize + blockSize / 6
    );
    ctx.fillStyle = 'red';
    ctx.fill();
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
    });
}

function drawFruit() {
    drawHeart(fruit.x, fruit.y);
}

function drawScore() {
    scoreValue.textContent = score;
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    snake.unshift(head);

    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        fruit = { x: Math.floor(Math.random() * (canvas.width / blockSize)), y: Math.floor(Math.random() * (canvas.height / blockSize)) };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
        clearInterval(gameInterval);
        alert('游戏结束！请点击重新开始！你的得分是: ' + score);
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval);
            alert('游戏结束！请点击重新开始！你的得分是: ' + score);
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFruit();
    drawScore();
    checkCollision();
}

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

document.getElementById('startButton').addEventListener('click', function () {
    if (!gameInterval) {
        gameInterval = setInterval(gameLoop, 100);
    }
});

document.getElementById('pauseButton').addEventListener('click', function () {
    clearInterval(gameInterval);
    gameInterval = null;
});

// 重新开始函数
function restartGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    fruit = { x: Math.floor(Math.random() * (canvas.width / blockSize)), y: Math.floor(Math.random() * (canvas.height / blockSize)) };
    score = 0;
    drawScore();
    gameInterval = setInterval(gameLoop, 100);
}

// 为重新开始按钮添加点击事件监听器
document.getElementById('restartButton').addEventListener('click', restartGame);