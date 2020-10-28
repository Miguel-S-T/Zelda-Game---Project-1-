let currentGame;
let currentArcher;


document.getElementById('game-board').style.display = "none";
document.getElementById('start-button').style.display = 'inline';
document.getElementById('start-img').style.display = 'inline';
document.getElementById('score-div').style.display = 'none';
document.getElementById('play-again').style.display = 'none';
document.getElementById('game-over-img').style.display = 'none';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.getElementById('start-button').onclick = () => { //STARTS GAME ON CLICK
    startGame();
}
document.getElementById('play-again').onclick = () => { // RESTARTS GAME ON CLICK
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
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('score-div').style.display = 'none';
    document.getElementById('play-again').style.display = 'inline';
    document.getElementById('game-over-img').style.display = 'inline';
    document.removeEventListener('keydown', keyPressed)
}


function startGame() {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('score-div').style.display = 'inline';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('game-over-img').style.display = 'none';
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

function keyPressed(e) {  // ACTIVATE KEYBOARD KEYS - MOVE ARCHER
    let whereToGo = e.keyCode
    currentGame.archer.moveArcher(whereToGo)
}


function detectCollision(obstacle) {  // ENEMY COLLISION 
    return (currentGame.archer.y > obstacle.y - obstacle.height 
        && currentGame.archer.x + currentGame.archer.width > obstacle.x 
        && currentGame.archer.x < obstacle.x + obstacle.width
        && currentGame.archer.y < obstacle.y + obstacle.height); 
}

function detectCollisionOfShots(obstacle, shot) {  // SHOTS COLLISION 
        return ( shot.x + shot.width > obstacle.x 
            && shot.y < obstacle.y + obstacle.height
            && shot.y + shot.height > obstacle.y 
            && shot.x < obstacle.x + obstacle.width);
    

}

let obstaclesFrequency = 0;
let obstaclesFrequency2 = 0;
let shotsFrequency = 0;

function updateCanvas() {
        ctx.clearRect(0, 0, 700, 500);
        currentGame.archer.drawArcher();
        if(currentGame.isGameRunning) {
            // OBSTACLE 2 
            if (currentGame.score >= 3) {  
                obstaclesFrequency2++;
                if (obstaclesFrequency2 % 100 === 1) { // AQUI (% 100) MUDAMOS A QUANTIDADE DOS INIMIGOS
                let randomObstacle2X = 700;
                let randomObstacle2Y = Math.floor(Math.random() * 450);
                let newObstacle2 = new Obstacle2(randomObstacle2X, randomObstacle2Y);
                      currentGame.obstacles2.push(newObstacle2);
            }
            for(let i = 0; i < currentGame.obstacles2.length; i++) {
                currentGame.obstacles2[i].x -= 0.6; // VELOCIDADE DOS INIMIGOS 2
                currentGame.obstacles2[i].drawObstacle2();
                if (currentGame.obstacles2[i].x <= 0 || detectCollision(currentGame.obstacles2[i])) {
                    resetGame();    // STOPS AND RESTARTS THE GAME 
                }
                if (currentGame.obstacles2.length > 0 && currentGame.obstacles2[i].y >= 700) { // Obstacle moved outside the canvas
                    currentGame.obstacles2.splice(i, 1); 
                }
            }  
            }
            if (currentGame.obstacles2.length > 0 && currentGame.archer.shots.length > 0) {
                for(let k = 0; k < currentGame.obstacles2.length -1; k++){ // COLLISION SHOTS WITH ENEMIES // SEMPRE QUE QUISER INDEXAR ITEMS NO ARRAY QUE ESTÁS A UTILIZAR A PRÓPRIA LENGTH DELE NO FOR LOOP TEMOS QUE USAR O -1.
                    for (let l = 0; l < currentGame.archer.shots.length; l++) {
                       
                         if (detectCollisionOfShots(currentGame.obstacles2[k], currentGame.archer.shots[l])) {
                            currentGame.obstacles2.splice(k, 1);
                            currentGame.archer.shots.splice(l, 1);
                            currentGame.score++;
                            document.getElementById("score").innerHTML = currentGame.score
                    }
                }
            } 
            }
            // OBSTACLE 1 
            obstaclesFrequency++; 
            if (obstaclesFrequency % 100 === 1) { // AQUI (% 100) MUDAMOS A QUANTIDADE DOS INIMIGOS
            let randomObstacleX = 700;
            let randomObstacleY = Math.floor(Math.random() * 450);
            let newObstacle = new Obstacle(randomObstacleX, randomObstacleY);
                  currentGame.obstacles.push(newObstacle);
        }
            // COLLISION SHOTS WITH ENEMIES 
            if (currentGame.obstacles.length > 0 && currentGame.archer.shots.length > 0) {
                for(let k = 0; k < currentGame.obstacles.length -1; k++){ // SEMPRE QUE QUISER INDEXAR ITEMS NO ARRAY QUE ESTÁS A UTILIZAR A PRÓPRIA LENGTH DELE NO FOR LOOP TEMOS QUE USAR O -1.
                    for (let l = 0; l < currentGame.archer.shots.length; l++) {   
                        if (detectCollisionOfShots(currentGame.obstacles[k], currentGame.archer.shots[l])) {
                            currentGame.obstacles.splice(k, 1);
                            currentGame.archer.shots.splice(l, 1);
                            currentGame.score++;
                            document.getElementById("score").innerHTML = currentGame.score
                    }
                }
            } 
            }
            for(let i = 0; i < currentGame.obstacles.length; i++) {
                currentGame.obstacles[i].x -= 0.6; // VELOCIDADE DOS INIMIGOS
                currentGame.obstacles[i].drawObstacle();
                if (currentGame.obstacles[i].x <= 0 || detectCollision(currentGame.obstacles[i])) {
                    resetGame();    // STOPS AND RESTARTS THE GAME 
                }  
                if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 700) { // Obstacle moved outside the canvas
                    currentGame.obstacles.splice(i, 1); 
                }
            }
            if (currentGame.isGameRunning && currentGame.archer.shots !== undefined) {
                for(let i = 0; i < currentGame.archer.shots.length; i++) { 
                    currentGame.archer.shots[i].x += 4; // VELOCIDADE DOS SHOTS
                    currentGame.archer.shots[i].drawShot();
                }
            } 
        }

if(currentGame.isGameRunning) {     
    requestAnimationFrame(updateCanvas); // RUNS THE GAME
} 
    
}
