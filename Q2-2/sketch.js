// チェッカー
function setup() {
  createCanvas(200, 200);
  const size = width / 8; // マスの一辺の長さ

  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      // BLANK[1] ヒント： rectのx座標は size * i, y座標は size * j
   if ((i+j) % 2 === 0){
       fill(255);
   } else {
       fill(80);
   }

    rect( j * size, i * size, size, size);

    if(i<3 && (i+j) % 2 === 1){
      fill(255,0,0);
      circle(
        j*size+size/2,
        i*size+size/2,
        size*0.8
      );
    }

    if(i>=5 && (i+j) % 2 === 1){
       fill(0);
       circle(
        j*size+size/2,
        i*size+size/2,
        size*0.8
       );
}
  
}
  }
}