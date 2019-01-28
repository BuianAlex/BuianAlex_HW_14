class Game {
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.rings = [{
          width: 150,
          height: 25,
          fill: "#6600ff",
          isDragging: false,
          position:1
      },
      {
          width: 100,
          height: 25,
          fill: "#ff9933",
          isDragging: false,
          position:2
      },
      {
        width: 50,
        height: 25,
        fill: "#009933",
        isDragging: false,
        position:3
    }
      ]  
    this.createSpindle(this.rings);
  }
  render(){

  }

    
    
    
  createSpindle(rings){
    spindlWidth=  180;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(spindlWidth/2, 400, 5, 100);
    this.ctx.fillRect(0, 495, spindlWidth, 100);
    for (let r of rings){
      console.log(r.fill);  
      this.ctx.beginPath();
      this.ctx.fillStyle = r.fill;
      this.ctx.fillRect(spindlWidth/2-r.width/2, 495-25*r.position, r.width, r.height);   
    }



  }
}
const newGame = new Game;

