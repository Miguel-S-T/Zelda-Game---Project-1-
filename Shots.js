class Shots {
    constructor(x, y, speed) {
        this.x = x+40;
        this.y = y+15;
        this.speed = speed;
        this.width = 20;
        this.height = 20;
        this.img = "/img/shot-1 cut.png";
    }
drawShot() {
        const shotImg = new Image();
        shotImg.src = this.img;
        ctx.drawImage(shotImg, this.x, this.y, this.width, this.height);
  /* 
    ctx.fillStyle = "black";
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);
    */
}
createShot() {
    let newShoot = new Shots(currentArcher.x, currentArcher.y, this.speed);
    return newShoot
}

}