class Obstacle {  //  INIMIES 
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
   
  /*  ctx.fillStyle = "black";
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);
*/
}

}