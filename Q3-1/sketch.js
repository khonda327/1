// 心臓の鼓動のようなアニメーション
const cycle = 100; 
let count=0; 
let size=50;

function setup(){
  createCanvas(200, 200);
}

function draw(){
  background(160, 192, 255);
  count = (count + 1) % cycle;
  if (keyIsPressed) {
    count = (count + 2) % cycle;
  }
  if (count < cycle / 2) {
    size +=1;
  } else {
    size -=1;
  }
  ellipse(width / 2, height / 2, size, size);
}