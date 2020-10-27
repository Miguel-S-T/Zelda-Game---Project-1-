let currentGame;
let currentArcher;


document.getElementById('game-board').style.display = "none";
document.getElementById('start-button').style.display = 'inline';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

 document.getElementById('start-button').onclick = () => {
    startGame();
}

function resetGame() {
    currentGame.archer = {};
    currentGame.obstacles = [];
    currentGame.score = 0;
    currentGame.isGameRunning = false;
    obstaclesFrequency = 0;
    document.getElementById('score').innerHTML = currentGame.score;
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('start-button').style.display = 'inline';
    document.removeEventListener('keydown', keyPressed)
}


function startGame() {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    currentGame = new Game();
    currentGame.isGameRunning = true;
    currentArcher = new Archer();
    currentGame.archer = currentArcher; 
    if(currentGame.isGameRunning) {
        document.addEventListener('keydown', keyPressed)
        currentGame.archer.drawArcher(); 
        updateCanvas();
}
}

function keyPressed(e) {
    let whereToGo = e.keyCode
    currentGame.archer.moveArcher(whereToGo)
}


function detectCollision(obstacle) { 
    return (currentGame.archer.y > obstacle.y - obstacle.height 
        && currentGame.archer.x + currentGame.archer.width > obstacle.x 
        && currentGame.archer.x < obstacle.x + obstacle.width
        && currentGame.archer.y < obstacle.y + obstacle.height); 
}

let obstaclesFrequency = 0;
let shotsFrequency = 0;

function updateCanvas() {
        ctx.clearRect(0, 0, 700, 500);
        currentGame.archer.drawArcher();

        
        obstaclesFrequency++;
        if (obstaclesFrequency % 100 === 1) { // AQUI (% 100) MUDAMOS A QUANTIDADE DOS INIMIGOS
            let randomObstacleX = 700;
            let randomObstacleY = Math.floor(Math.random() * 450);
            let newObstacle = new Obstacle(randomObstacleX, randomObstacleY);
                  currentGame.obstacles.push(newObstacle);
                  obstaclesFrequency++;
        }
        // draws the obstacle
        if(currentGame.isGameRunning) {

            for(let i = 0; i < currentGame.obstacles.length; i++) {
                currentGame.obstacles[i].x -= 0.6; // VELOCIDADE DOS INIMIGOS
                currentGame.obstacles[i].drawObstacle();
                if (currentGame.obstacles[i].x <= 0 || detectCollision(currentGame.obstacles[i])) {
                    resetGame()
                    alert("GAME OVER!")
                }  
                // Obstacle moved outside the canvas
                if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 700) {
                    currentGame.obstacles.splice(i, 1);
              //      currentGame.score++;
              //  document.getElementById('score').innerHTML = currentGame.score;
                }
                
            }


            if (currentGame.isGameRunning && currentGame.archer.shots !== undefined) {
                for(let i = 0; i < currentGame.archer.shots.length; i++) { 
                    currentGame.archer.shots[i].x += 0.6; 
                    currentGame.archer.shots[i].drawShot();
                }
            } 
        }

if(currentGame.isGameRunning) {

    requestAnimationFrame(updateCanvas);
}
    
}
