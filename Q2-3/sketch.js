function setup() {
  createCanvas(300, 200);
 background(255);
 let size = height/6;

 for (let i=0;i<6;i++){
  if(i==0 || i==5){
    fill(165,25,49);
  }else if (i==1 || i==4){
    fill(255);
  }else{
    fill(45,42,74);
  }
    rect(0,i*size,width,size);
 }
}