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
this.width = 82;
this.height = 82;
this.img = "/img/enemy-2_RED_-removebg-preview (1).png";
    }
    drawObstacle2() {
        const enemyImg2 = new Image();
        enemyImg2.src = this.img;
        ctx.drawImage(enemyImg2, this.x, this.y, this.width, this.height)
     /* 
        ctx.fillStyle = "black";
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        */
    }
}