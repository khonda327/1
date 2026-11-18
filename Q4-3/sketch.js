// たくさん出てくるアニメーション
let balls;
let targets;

function setup(){
  createCanvas(windowWidth, windowHeight);
  balls = [];
  targets = [];
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);

  // 的のアニメーション
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    fill(0);
    ellipse(t.x, t.y, t.size);
    t.x += t.vx;
    t.y += t.vy;
    t.size += 2;
  }

  // ボールのアニメーション
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    fill(255);
    ellipse(b.x, b.y, b.size);
    b.x += b.vx;
    b.y += b.vy;
  }

  // 画面外に出たボールを削除
  const ballsInCanvas = [];
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    if(b.x > 0 && b.x < width && b.y > 0 && b.y < height){
      ballsInCanvas.push(b);
    }
  }
  balls = ballsInCanvas;

  if(frameCount % 20 === 0) {
    // BLANK[1] 的を作成して追加
    let angle = random(TWO_PI);
    let speed = random(1, 3);

    let t = {
      x: width / 2,
      y: height / 2,
      size: 10,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed
    };

    targets.push(t);
  }

  // ボールに当たった的を削除
  const activeTargets = [];
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    if(t.size < 200){
      let hit = false;

      for(let j = 0; j < balls.length; j++){
        let b = balls[j];

        // BLANK[2] 衝突判定
        if(dist(t.x, t.y, b.x, b.y) < (t.size + b.size) / 2){
          hit = true;
          break;
        }
      }

      if(!hit) activeTargets.push(t);
    }
  }
  targets = activeTargets;
}

function mouseDragged(){
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;

  if(mag(dx, dy) > 5){
    const b = {
      x: mouseX,
      y: mouseY,
      size: 20,
      vx: dx,
      vy: dy
    };
    balls.push(b);
  }
}

function insideCanvas(b) {
  return b.x > 0 && b.x < width && b.y > 0 && b.y < height;
}
