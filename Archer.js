class Archer {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 42;
        this.height = 42; 
        this.img = "/img/archer_3_paço_left_p_tirar_fundo-removebg-preview.png";
        this.animationToggle = 0;
        this.img2 = "/img/archer_3_paço_right_p_tirar_fundo-removebg-preview.png";
        this.shots = [];
    }
    drawArcher() {
        const archerImg = new Image();
        archerImg.src = this.img;
        const archerImg2 = new Image();
        archerImg2.src = this.img2;
        if (this.animationToggle % 2 === 0) {
          ctx.drawImage(archerImg, this.x, this.y, this.width, this.height);
        } else {
          ctx.drawImage(archerImg2, this.x, this.y, this.width, this.height);
        }
        
    }
    shoot() {
   //   console.log('creating shot');
      let shot = new Shots();
      this.shots.push(shot.createShot());
    }
    moveArcher(keyCode){
   //     console.log('x', this.x);
   //     console.log('y', this.y);
        ctx.clearRect(this.x, this.y, this.width, this.height);
        switch(keyCode){
          case 38: // move up
          //Making sure archer doesn't go off the road
          if(this.y > 20){
            this.animationToggle++;
            this.y -= 30;
          }
            break;
          case 40: // move down 
          if (this.y < 430) {
            this.animationToggle++;
            this.y += 30;
          }
            break;
          case 37: // move left
          if (this.x > 0) {
            this.animationToggle++;
            this.x -= 30;
          }
          break;
          case 39: // move right
          if (this.x < 630) {
            this.animationToggle++;
              this.x += 30;
          }
          break;
          case 83: // shoot
            this.shoot();
          break;
        }
      }
} 

  
     