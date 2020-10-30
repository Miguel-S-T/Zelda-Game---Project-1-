let currentGame;
let currentArcher;
let introSong = new Audio ("/SOUNDS/Zelda - intro song 1.mp3")
let gamePlayMusic = new Audio("/SOUNDS/Zelda - gameplay song 1.mp3")
let gameOverSong = new Audio("/SOUNDS/Zelda - gameover song 1.mp3")
let winnerSong = new Audio("/SOUNDS/Zelda - winner song 1.mp3")
let linkShot = new Audio("/SOUNDS/Zelda - shot 2.wav")
let enemyDead1 = new Audio("/SOUNDS/Zelda - enemy died 1.wav")
let enemyDead2 = new Audio("/SOUNDS/Zelda - enemy died 2.wav")
let enemyDead3 = new Audio("/SOUNDS/Zelda - enemy  big died 3.wav")
let levelUpSong = new Audio("/SOUNDS/Zelda - level up .wav")


/*document.addEventListener("mousemove", function(){
    if (currentGame.isGameRunning === false 
        && gamePlayMusic.play() === false 
        && gameOverSong.play() === false
        && winnerSong.play() === false ){
        introSong.play();
    }  
})
*/


document.getElementById('game-board').style.display = "none";
document.getElementById('start-button').style.display = 'inline';
document.getElementById('start-img').style.display = 'inline';
document.getElementById('score-div').style.display = 'none';
document.getElementById('play-again').style.display = 'none';
document.getElementById('game-over-img').style.display = 'none';
document.getElementById('winner').style.display = 'none';
document.getElementById('play-again2').style.display = 'none';
document.getElementById('win-game-img').style.display = 'none';
document.getElementById('instructions').style.display = 'none';
document.getElementById('level-div').style.display = 'none';


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.getElementById('start-button').onclick = () => { //STARTS GAME ON CLICK
    startGame();
}
document.getElementById('play-again').onclick = () => { // RESTARTS GAME ON CLICK
    startGame();
}
document.getElementById('play-again2').onclick = () => { // RESTARTS GAME ON CLICK
    startGame();
}



function winGame() {
    currentGame.archer = {};
    currentGame.obstacles = [];
    currentGame.score = 0;
    currentGame.level = 0;
    currentGame.isGameRunning = false;
    obstaclesFrequency = 0;
    introSong.pause();
    gamePlayMusic.pause();
    gameOverSong.pause();
    winnerSong.play();
    document.getElementById('score').innerHTML = currentGame.score;
    document.getElementById('level-numbers').innerHTML = currentGame.level;
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('score-div').style.display = 'none';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('game-over-img').style.display = 'none';
    document.getElementById('win-game-img').style.display = "block"
    document.getElementById('winner').style.display = 'inline';
    document.getElementById('play-again2').style.display = 'inline';
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('level-div').style.display = 'none';
    document.removeEventListener('keydown', keyPressed)
}

function resetGame() {
    currentGame.archer = {};
    currentGame.obstacles = [];
    currentGame.score = 0;
    currentGame.level = 0;
    currentGame.isGameRunning = false;
    obstaclesFrequency = 0;
    introSong.pause();
    gamePlayMusic.pause();
    gameOverSong.play();
    winnerSong.pause();
    document.getElementById('score').innerHTML = currentGame.score;
    document.getElementById('level-numbers').innerHTML = currentGame.level;
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('score-div').style.display = 'none';
    document.getElementById('play-again').style.display = 'inline';
    document.getElementById('game-over-img').style.display = 'inline';
    document.getElementById('winner').style.display = 'none';
    document.getElementById('play-again2').style.display = 'none';
    document.getElementById('win-game-img').style.display = 'none';
    document.getElementById('instructions').style.display = 'none'; 
    document.getElementById('level-div').style.display = 'none';
    document.removeEventListener('keydown', keyPressed)
}


function startGame() {
    document.getElementById('game-board').style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('start-img').style.display = 'none';
    document.getElementById('score-div').style.display = 'inline';
    document.getElementById('play-again').style.display = 'none';
    document.getElementById('game-over-img').style.display = 'none';
    document.getElementById('winner').style.display = 'none';
    document.getElementById('play-again2').style.display = 'none';
    document.getElementById('win-game-img').style.display = 'none';
    document.getElementById('instructions').style.display = 'inline';
    document.getElementById('level-div').style.display = 'inline'; 
    introSong.pause();
    gamePlayMusic.play();
    gameOverSong.pause();
    winnerSong.pause();
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
function levelUp() {
    if (currentGame.score % 5 === 0 && currentGame.score != 0) {
        currentGame.level++;
        levelUpSong.play();
        document.getElementById("level-numbers").innerHTML = currentGame.level
    }
}

let obstaclesFrequency = 0;
let obstaclesFrequency2 = 0;
let obstaclesFrequency3 = 0;
let shotsFrequency = 0;

function updateCanvas() {
        ctx.clearRect(0, 0, 700, 500);
        currentGame.archer.drawArcher();
        
        if(currentGame.isGameRunning) {

            // WIN GAME 
            if (currentGame.score === 40) { // -> SCORE TO WIN GAME 
                winGame();
            }
            
            // OBSTACLE 3 
            if (currentGame.score >= 3) {  
                obstaclesFrequency3++;
                if (obstaclesFrequency3 % 130 === 1) { // AQUI (% 100) MUDAMOS A QUANTIDADE DOS INIMIGOS
                let randomObstacle3X = 700;
                let randomObstacle3Y = Math.floor(Math.random() * 350);
                let newObstacle3 = new Obstacle3(randomObstacle3X, randomObstacle3Y);
                      currentGame.obstacles3.push(newObstacle3);
            }
            for(let i = 0; i < currentGame.obstacles3.length; i++) {
                currentGame.obstacles3[i].x -= 0.4; // VELOCIDADE DOS INIMIGOS 2
                currentGame.obstacles3[i].drawObstacle3();
                if (currentGame.obstacles3[i].x <= 0 || detectCollision(currentGame.obstacles3[i])) { // COLLISION ARCHER WITH ENEMIES
                    resetGame();    // STOPS AND RESTARTS THE GAME 
                }
                if (currentGame.obstacles3.length > 0 && currentGame.obstacles3[i].y >= 700) { // Obstacle moved outside the canvas
                    currentGame.obstacles3.splice(i, 1); 
                }
            }  
            }
            if (currentGame.obstacles3.length > 0 && currentGame.archer.shots.length > 0) {
                for(let k = 0; k < currentGame.obstacles3.length -1; k++){ // COLLISION SHOTS WITH ENEMIES // SEMPRE QUE QUISER INDEXAR ITEMS NO ARRAY QUE ESTÁS A UTILIZAR A PRÓPRIA LENGTH DELE NO FOR LOOP TEMOS QUE USAR O -1.
                    for (let l = 0; l < currentGame.archer.shots.length; l++) {
                       
                         if (detectCollisionOfShots(currentGame.obstacles3[k], currentGame.archer.shots[l])) {
                            currentGame.obstacles3[k].receiveDamage2();
                            if(currentGame.obstacles3[k].health <= 0) {
                                currentGame.obstacles3.splice(k, 1);
                                enemyDead3.play();
                                currentGame.score++;
                                document.getElementById("score").innerHTML = currentGame.score
                                levelUp();
                            }
                            currentGame.archer.shots.splice(l, 1);
                    }
                }
            } 
            }

            // OBSTACLE 2 
            if (currentGame.score >= 2) {  
                obstaclesFrequency2++;
                if (obstaclesFrequency2 % 110 === 1) { // AQUI (% 100) MUDAMOS A QUANTIDADE DOS INIMIGOS
                let randomObstacle2X = 700;
                let randomObstacle2Y = Math.floor(Math.random() * 350);
                let newObstacle2 = new Obstacle2(randomObstacle2X, randomObstacle2Y);
                      currentGame.obstacles2.push(newObstacle2);
            }
            for(let i = 0; i < currentGame.obstacles2.length; i++) {
                currentGame.obstacles2[i].x -= 0.5; // VELOCIDADE DOS INIMIGOS 2
                currentGame.obstacles2[i].drawObstacle2();
                if (currentGame.obstacles2[i].x <= 0 || detectCollision(currentGame.obstacles2[i])) { // COLLISION ARCHER WITH ENEMIES
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
                            currentGame.obstacles2[k].receiveDamage();
                            if(currentGame.obstacles2[k].health <= 0) {
                                currentGame.obstacles2.splice(k, 1);
                                enemyDead2.play()
                                currentGame.score++;
                                document.getElementById("score").innerHTML = currentGame.score
                                levelUp();
                            }
                            currentGame.archer.shots.splice(l, 1);
                           
                            
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
                            enemyDead1.play();
                            currentGame.archer.shots.splice(l, 1);
                            currentGame.score++;
                            document.getElementById("score").innerHTML = currentGame.score
                            levelUp();
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
