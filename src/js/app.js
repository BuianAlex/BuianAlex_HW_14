class Game {
  constructor(){
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    
    this.rings = [{
          width: 150,
          height: 25,
          x:0,
          y:475,
          fill: "#6600ff",
          fillHover: '#a366ff',
          isDragging: false,
          isHover: false,
          spindlX: 0, 
          position:1
      },
      {
          width: 100,
          height: 25,
          x: 0,
          y: 0,
          fill: "#ff9933",
          fillHover: '#ffb770',
          isDragging: false,
          isHover: false,
          spindlX: 250,
          position:2
      },
      {
        width: 50,
        height: 25,
        x: 0,
        y: 0,
        spindlX: 500,
        fill: "#009933",
        fillHover: '#66c184',
        isDragging: false,
        isHover: false,
        position:3
    }
      ]
    this.startMouseX;
    this.startMouseY;    
    this.render();
  }
  render(){
    this.ctx.clearRect(0, 0, 900, 500);
    this.createSpindle(0);
    this.createSpindle(250);
    this.createSpindle(500);
    this.createRings();
    this.mousWatcher();

  }

    
    
    
  createSpindle(spindlX){
    spindlWidth=  180;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(spindlX+spindlWidth/2-2, 400, 4, 100); //spindle
    this.ctx.fillRect(spindlX, 495, spindlWidth, 100); //base spindle
    
  }
  createRings(){
    this.rings.forEach(function (r,index) {
      this.ctx.beginPath();

      if (r.isHover){
        this.ctx.fillStyle = r.fillHover;
      }
      else{
        this.ctx.fillStyle = r.fill;
      }
      // this.rings[index].x = r.spindlX+spindlWidth/2-r.width/2;
      // this.rings[index].y = 495-25*r.position;
      
      //this.ctx.fillRect(r.spindlX+spindlWidth/2-r.width/2, 495-25*r.position, r.width, r.height); 
      this.ctx.fillRect(r.x, r.y, r.width, r.height);
    },this);
  }

  mousWatcher(){
    this.canvas.onmousemove = this.getMousePos.bind(this);
    this.canvas.onmouseup =this.mouseUp.bind(this);
    this.canvas.onmousedown = this.mouseDown.bind(this);
  }


  getMousePos(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let offset = this.canvas.getBoundingClientRect();
    let curMouseX = evt.clientX - offset.left;
    let curMouseY = evt.clientY - offset.top;
 
    
    //hover effect
    for (var i = 0; i < this.rings.length; i++) {
      let r = this.rings[i];
      if(r.isDragging){

          let mouseShiftX = curMouseX - this.startMouseX;
          let mouseShiftY = curMouseY - this.startMouseY;
          this.rings[i].y += mouseShiftY;
          this.rings[i].x += mouseShiftX;
        //  
        if (r.x + r.width > 900 || r.x < 0 || this.rings[i].y + r.height > 500 || this.rings[i].y < 0 || this.collision(this.rings[i])){
          
          this.rings[i].y-=mouseShiftY;
          this.rings[i].x -= mouseShiftX;
          console.log("colli" + this.rings[i].x);
        }
        
          

        } 
      if (curMouseX > r.x && curMouseX < r.x + r.width && curMouseY > r.y && curMouseY < r.y + r.height) {
        r.isHover = true;
        
        this.render();
        this.startMouseX = curMouseX;
        this.startMouseY = curMouseY; 
      }
      else{
        r.isHover = false; 
        this.render();
      }
    }
  }  
  mouseUp(){
    console.log("up");
    for (var i = 0; i < this.rings.length; i++) {
      if (this.rings[i].isDragging){
        this.rings[i].isDragging = false;
        break;
      }
    }   
    
  }
  mouseDown(){
    for (var i = 0; i < this.rings.length; i++) {
      if(this.rings[i].isHover){
        this.rings[i].isDragging = true;
        break;
      }
    }   
  }
  viewBorder(){

  }
  collision(item){
    for (var i = 0; i < this.rings.length; i++) {
      if (this.rings[i].x===item.x+item.width) { 
        return true;
      }
      if (this.rings[i].x+this.rings[i].width === item.x) {
        return true;
      }

    }   
  }


}
const newGame = new Game;

