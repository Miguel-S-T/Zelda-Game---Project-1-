class Obstacle {  //  ENEMIES 
    constructor(x, y) {
this.x = x;
this.y = y;
this.width = 42;
this.height = 42;
this.img = "/img/emeny-2.png";
    }
drawObstacle() {
    const enemyImg = new Image();
    enemyImg.src = this.img;
    ctx.drawImage(enemyImg, this.x, this.y, this.width, this.height);
  /*
    ctx.fillStyle = "black";
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);
*/
}

}

class Obstacle2 extends Obstacle {
    constructor(x, y) {
        super(x, y);
this.x = x;
this.y = y;
this.width = 88;
this.height = 88;
this.img = "/img/enemy-2_RED_-removebg-preview (1).png";
this.health = 2;

    }
    drawObstacle2() {
        const enemyImg2 = new Image();
        enemyImg2.src = this.img;
        ctx.drawImage(enemyImg2, this.x, this.y, this.width, this.height)
    }
    receiveDamage() {
        this.health--; 
    }
}

class Obstacle3 extends Obstacle {
    constructor(x, y) {
        super(x, y);
this.x = x;
this.y = y;
this.width = 170;
this.height = 150;
this.img = "/img/EMENY_3.3_P_CORTAR_FUNDO_-removebg-preview (1).png";
this.health = 3;

    }
    drawObstacle3() {
        const enemyImg3 = new Image();
        enemyImg3.src = this.img;
        ctx.drawImage(enemyImg3, this.x, this.y, this.width, this.height)
    }
    receiveDamage2() {
        this.health--; 
    }
}