console.log("JavaScript loaded");

const gameArea = document.getElementById('gameArea');
const paddle = document.getElementById('paddle');
const scoreDisplay = document.getElementById('score');

let paddleX = (gameArea.clientWidth - paddle.clientWidth) / 2;
const paddleSpeed = 20;

let score = 0;
let balls = [];

// Function to create a new ball
function createBall() {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.left = `${gameArea.clientWidth / 2}px`;
    ball.style.top = `${gameArea.clientHeight / 2}px`;
    gameArea.appendChild(ball);
    
    const ballObj = {
        element: ball,
        x: gameArea.clientWidth / 2,
        y: gameArea.clientHeight / 2,
        speedX: (Math.random() * 4) - 2,
        speedY: 2
    };
    balls.push(ballObj);
}

function increaseScore() {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    if (score >= 10 && score % 10 === 0) {
        createBall();
    }
}

function update() {
    balls.forEach(ball => {
        // Update ball position
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Check for collision with walls
        if (ball.x <= 0 || ball.x >= gameArea.clientWidth - ball.element.clientWidth) {
            ball.speedX *= -1;
        }
        if (ball.y <= 0) {
            ball.speedY *= -1;
        }

        // Check for collision with paddle
        if (ball.y >= gameArea.clientHeight - paddle.clientHeight - ball.element.clientHeight &&
            ball.x >= paddleX && ball.x <= paddleX + paddle.clientWidth) {
            ball.speedY *= -1;
            increaseScore();
        }

        // Check for game over (ball hits the bottom)
        if (ball.y >= gameArea.clientHeight - ball.element.clientHeight) {
            if (confirm("Game Over! Play again?")) {
                score = 0;
                scoreDisplay.textContent = 'Score: ' + score;
                balls.forEach(ballObj => ballObj.element.remove());
                balls = [];
                createBall();
            } else {
                return;
            }
        }

        // Update ball position in the DOM
        ball.element.style.left = ball.x + 'px';
        ball.element.style.top = ball.y + 'px';
    });

    // Update paddle position in the DOM
    paddle.style.left = paddleX + 'px';

    requestAnimationFrame(update);
}

function movePaddle(event) {
    if (event.key === 'ArrowLeft' && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
    if (event.key === 'ArrowRight' && paddleX < gameArea.clientWidth - paddle.clientWidth) {
        paddleX += paddleSpeed;
    }
}

document.addEventListener('keydown', movePaddle);

// Initialize the game with one ball
createBall();
update();
