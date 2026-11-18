
// ボール当てゲーム

let balls = [];       // 発射したボールを入れる配列
let targets = [];     // 的を入れる配列

let score = 0;        // 得点
let startTime;        // ゲーム開始時間
let gameOver = false; // ゲーム終了の判定

const gameTime = 30;  // 制限時間（秒）

function setup() {
  createCanvas(600, 400);
  resetGame();
}

function draw() {
  background(230, 240, 255);

  // 制限時間を計算する
  let elapsed = (millis() - startTime) / 1000;
  let remaining = ceil(gameTime - elapsed);

  // ゲーム中の場合
  if (!gameOver) {

    // 時間がなくなったら終了
    if (remaining <= 0) {
      gameOver = true;
    } else {
      moveTargets();
      moveBalls();
      checkCollisions();
    }
  }

  // 的を表示する
  drawTargets();

  // ボールを表示する
  drawBalls();

  // 得点と残り時間を表示する
  fill(30);
  textSize(20);
  textAlign(LEFT);
  text("SCORE: " + score, 20, 30);
  text("TIME: " + max(0, remaining), 470, 30);

  // ゲーム終了画面
  if (gameOver) {
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER);
    textSize(35);
    text("GAME OVER", width / 2, height / 2 - 15);

    textSize(20);
    text("SCORE: " + score, width / 2, height / 2 + 25);
    text("Press Enter to Restart", width / 2, height / 2 + 65);
  }
}

// ゲームを初期状態に戻す関数
function resetGame() {
  balls = [];
  targets = [];
  score = 0;
  gameOver = false;
  startTime = millis();

  // 的を3つ作る
  for (let i = 0; i < 3; i++) {
    targets.push({
      x: 120 + i * 180,
      y: 100 + i * 35,
      r: 20,
      vx: random(2, 4)
    });
  }
}

// 的を動かす関数
function moveTargets() {
  for (let target of targets) {
    target.x += target.vx;

    // 画面の端に着いたら反対方向に動く
    if (target.x > width - target.r ||
        target.x < target.r) {
      target.vx *= -1;
    }
  }
}

// 的を描く関数
function drawTargets() {
  for (let target of targets) {
    fill(255, 100, 100);
    noStroke();
    circle(target.x, target.y, target.r * 2);

    fill(255);
    circle(target.x, target.y, target.r);
  }
}

// ボールを動かす関数
function moveBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;

    // 画面の外に出たボールを削除
    if (balls[i].y < 0 ||
        balls[i].x < 0 ||
        balls[i].x > width) {
      balls.splice(i, 1);
    }
  }
}

// ボールを描く関数
function drawBalls() {
  for (let ball of balls) {
    fill(50, 100, 255);
    noStroke();
    circle(ball.x, ball.y, 15);
  }
}

// ボールと的が当たったか調べる関数
function checkCollisions() {
  for (let i = balls.length - 1; i >= 0; i--) {

    for (let target of targets) {
      let d = dist(
        balls[i].x,
        balls[i].y,
        target.x,
        target.y
      );

      // ボールと的が接触した場合
      if (d < 15 / 2 + target.r) {
        score++;

        // 的を新しい場所に移動させる
        target.x = random(50, width - 50);
        target.y = random(70, 180);
        target.vx = random([-4, -3, 3, 4]);

        // 当たったボールを削除する
        balls.splice(i, 1);
        break;
      }
    }
  }
}

// マウスをクリックしたときにボールを発射
function mousePressed() {
  if (!gameOver && mouseY < height - 50) {
    shootBall();
  }
}

// ボールを発射する関数
function shootBall() {
  balls.push({
    x: width / 2,
    y: height - 35,
    vx: (mouseX - width / 2) * 0.015,
    vy: -7
  });
}

// Enterキーでゲームをやり直す
function keyPressed() {
  if (key === 'Enter') {
    resetGame();
  }
}

