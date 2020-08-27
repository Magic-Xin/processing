var wW;
var wH;

var imgPlayer1;
var imgPlayer2;

var imgPoint0;
var imgPoint1;
var imgPoint2;
var imgPoint3;

var imgNeon1;
var imgNeon2;
var imgNeon3;


var fontsNeon;

function preload() {
  imgPlayer1 = loadImage("images/player1.png");
  imgPlayer2 = loadImage("images/player2.png");

  imgPoint0 = loadImage("images/circle0.png");
  imgPoint1 = loadImage("images/player1.png");
  imgPoint2 = loadImage("images/player2.png");
  imgPoint3 = loadImage("images/player3.png");

  imgNeon1 = loadImage("images/neon1.png");
  imgNeon2 = loadImage("images/neon2.png");
  imgNeon3 = loadImage("images/neon3.png");
}


var rW;
var rH;
var sW;
var sH;

function setup() {
  rW = windowWidth / 9;
  rH = windowHeight / 16;
  if (rW < rH) {
    wW = 9 * rW;
    wH = 16 * rW;
  } else {
    wW = 9 * rH;
    wH = 16 * rH;
  }
  createCanvas(wW, wH);
  noStroke();
  frameRate(30);
  randomSeed();
  angleMode(DEGREES);
  reset();
}

function back() {
  background(50, 50, 50);
  fill(80, 80, 80)
  rect(wW * 1 / 3 - 3, 0, 6, wH);
  rect(wW * 2 / 3 - 3, 0, 6, wH);
}

function reset() {
  play = 0;
  game_over = 0;
  pause = 0;

  xP = wW * 50 / 100;
  stateP = 0;

  speed = 10;

  time = 0;
  genO = 1;
  yO = [0, 0, 0];
  sO = [0, 0, 0];

  genPts = [-1, -1];
  genPts2 = 0;
  yPts = [0, 0, 0];
  sPts = 0;

  meter = 0;
  points = 1;
  tSpeed = 100;
  maxSpeed = 0;
}

var play = 0;
var help = 0;
var pause = 0;
var game_over = 0;

var anim = -100;

function start() {
  if (anim < 100) {
    anim += 4;
  }
}

var xP = wW * 50 / 100;
var stateP = 0;

function keyPressed() {
  if (play) {
    if (!game_over) {
      if (keyCode === 80) {
        if (pause) {
          pause = 0;
        } else {
          pause = 1;
        }
      }
      if (!pause) {
        if (keyCode === LEFT_ARROW || keyCode === 65) {
          if (xP > wW * 1 / 3) {
            xP -= wW / 3;
          }
        }
        if (keyCode === RIGHT_ARROW || keyCode === 68) {
          if (xP < wW * 2 / 3) {
            xP += wW / 3;
          }
        }

        if (keyCode === UP_ARROW || keyCode === 87 || keyCode === 32) {
          stateP += 1
          if (stateP > 3) {
            stateP = 1;
          }
        }
        if (keyCode === DOWN_ARROW || keyCode === 83) {
          stateP -= 1
          if (stateP < 1) {
            stateP = 3;
          }
        }
      }
    }
  }
}

var mouseStatut = 0;

function mouseExe() {
  if (mouseIsPressed) {
    if (!mouseStatut) {
      mouseStatut = 1;

      if (play) {
          if (game_over) {
            if ((wW*50/100-50 < mouseX && mouseX < wW*50/100+50) && (wH*50/100+60 < mouseY && mouseY < wH*50/100+90)) {
              reset();
              play = 1;
            }
          } else {
            if (mouseX > wW*4/5-50 && mouseY < 50) {
              if (pause) {
                pause = 0;
              } else {
                pause = 1;
              }
            } else {
              if (!pause) {
                if (mouseY < wH - 51) {
                  if (mouseX < wW*50/100) {
                    if (xP > wW*1/3) {
                      xP -= wW/3;
                    }
                  } else {
                    if (xP < wW*2/3) {
                      xP += wW/3;
                    }
                  }
                } else {
                  if (mouseX < wW*50/100) {
                    stateP -=1
                    if (stateP < 1) {
                      stateP = 3;
                    }
                  } else {
                    stateP +=1
                    if (stateP > 3) {
                      stateP = 1;
                    }
                  }
                }
              }
            }
          }
        } else {
          if (wW*50/100-40 < mouseX && mouseX < wW*50/100+40 && wH*50/100-40 < mouseY && mouseY < wH*50/100+40) {
            play = 1;
          }
        }
    }
  } else {
    mouseStatut = 0;
  }
}

var points = 1;

function player() {
  hitbox();
}

function hitbox() {
  if (xP < wW * 50 / 100) {
    if (yO[0] > wH - 138 && wH - 68 > yO[0]) {
      if (sO[0] != stateP || !sO[0]) {
        game_over = 1;
      }
    }
    if (yPts[0] > wH - 118 && wH - 68 > yPts[0]) {
      if (sPts === stateP || !sPts) {
        yPts[0] = 0;
        points += 1;
      }
    }
  } else if (xP > wW * 50 / 100) {
    if (yO[2] > wH - 138 && wH - 68 > yO[2]) {
      if (sO[2] != stateP || !sO[2]) {
        game_over = 1;
      }
    }
    if (yPts[2] > wH - 118 && wH - 68 > yPts[2]) {
      if (sPts === stateP || !sPts) {
        yPts[2] = 0;
        points += 1;
      }
    }
  } else {
    if (yO[1] > wH - 138 && wH - 68 > yO[1]) {
      if (sO[1] != stateP || !sO[1]) {
        game_over = 1;
      }
    }
    if (yPts[1] > wH - 118 && wH - 68 > yPts[1]) {
      if (sPts === stateP || !sPts) {
        yPts[1] = 0;
        points += 1;
      }
    }
  }
}

function aPlayer() {
  switch (stateP) {
    case 0:
      image(imgPoint0, xP - 37.5, wH - 50 * anim / 100 - 105.5, 75, 75);
      break;
    case 1:
      image(imgPlayer1, xP - 37.5, wH - 50 * anim / 100 - 105.5, 75, 75);
      break;
    case 2:
      image(imgPlayer2, xP - 37.5, wH - 50 * anim / 100 - 105.5, 75, 75);
      break;
    case 3:
      image(imgPoint3, xP - 37.5, wH - 50 * anim / 100 - 105.5, 75, 75);
      break;
  }
}

var speed = 10;
var time = 0;

var genO = 1;
var yO = [0, 0, 0];
var sO = [0, 0, 0];

var genPts = [-1, -1];
var genPts2 = 0;
var yPts = [0, 0, 0];
var sPts = 0;

function elements() {
  time += 1;
  if (speed < 50) {
    speed += 1 / 100;
  } else {
    speed = 50;
  }

  if (!yO[0] && !yO[1] && !yO[2] && !yPts[0] && !yPts[1] && !yPts[2]) {
    sO = [0, 0, 0];
    genO = int(random(1, 7));
    if (meter > 200) {
      genO = int(random(4, 7));
    }
    switch (genO) {
      case 1:
        yO[0] = 1;
        break;
      case 2:
        yO[1] = 1;
        break;
      case 3:
        yO[2] = 1;
        break;
      case 4:
        yO[0] = 1;
        yO[1] = 1;
        break;
      case 5:
        yO[1] = 1;
        yO[2] = 1;
        break;
      case 6:
        yO[0] = 1;
        yO[2] = 1;
        break;
    }
    if (meter > 1000) {
      var pos = yO.indexOf(0);
      genO = int(random(0, 2));
      if (genO) {
        yO[pos] = 1;
        sO[pos] = int(random(1, 4));
      }
    }
    if (meter > 200) {
      genPts = [-1, -1];
      yO.forEach(function (item, index, array) {
        if (!yO[index]) {
          if (genPts[0] === -1) {
            genPts[0] = index;
          } else {
            genPts[1] = index;
          }
        }
      });
    }
    genPts2 = int(random(0, 2));
    yPts[genPts[genPts2]] = 1;
    if (meter > 1500) {
      sPts = int(random(0, 4));
    }
  } else {
    yO.forEach(function (item, index, array) {
      if (yO[index] != 0) {
        yO[index] += speed;
      }
      if (yO[index] > wH + 50) {
        yO[index] = 0;
      }
    });
    yPts.forEach(function (item, index, array) {
      if (yPts[index] != 0) {
        yPts[index] += speed;
      }
      if (yPts[index] > wH + 50) {
        yPts[index] = 0;
      }
    });
  }
}

function aObstacles() {
  for (var i = 0; i < 4; i++) {
    switch (sO[i]) {
      case 0:
        fill(153, 153, 153);
        rect(wW * i / 3 - 3, -30 + yO[i], wW * 1 / 3 + 6, 30);
        break;
      case 1:
        image(imgNeon1, wW * i / 3 + 3, -30 + yO[i], wW * 1 / 3 - 3, 30);
        break;
      case 2:
        image(imgNeon2, wW * i / 3 + 3, -30 + yO[i], wW * 1 / 3 - 3, 30);
        break;
      case 3:
        image(imgNeon3, wW * i / 3 + 3, -30 + yO[i], wW * 1 / 3 - 3, 30);
        break;
    }
  }
}

function aPoints() {
  for (var i = 0; i < 4; i++) {
    switch (sPts) {
      case 0:
        image(imgPoint0, wW * i / 3 + (wW * 1 / 3 / 2) - 25, -40 + yPts[i], 50, 50);
        break;
      case 1:
        image(imgPoint1, wW * i / 3 + (wW * 1 / 3 / 2) - 25, -40 + yPts[i], 50, 50);
        break;
      case 2:
        image(imgPoint2, wW * i / 3 + (wW * 1 / 3 / 2) - 25, -40 + yPts[i], 50, 50);
        break;
      case 3:
        image(imgPoint3, wW * i / 3 + (wW * 1 / 3 / 2) - 25, -40 + yPts[i], 50, 50);
        break;
    }
  }
}

function mGame_over() {
  aTableauTxt();
  fill(255, 255, 255);
  textSize(50);
  text("Game over", wW * 50 / 100 - 130, wH * 50 / 100 - 90);
  textSize(30);
  text("Score: " + (meter * points), 10, wH * 50 / 100);

  btnPlay();
}

function mStart() {
  btnPlay();
}

function aTableau() {
  fill(26, 26, 26);
  stroke(255, 255, 255);
  rect(-1, 0, wW + 1, 67);
  rect(-1, wH - 51, wW + 1, 50);
  noStroke();
}

function aTableauTxt() {
  textSize(15);
  fill(255, 255, 255);
  text("Meter: " + meter + " m ", 10, 16);
  text("Speed: " + tSpeed, 10, 31);
  text("Points: " + points, 10, 46);
  text("Score: " + (meter * points), 10, 61);
}

function btnPlay() {
  textSize(30);
  fill(255, 255, 255);
  if (play) {
    text("Replay", wW * 50 / 100 - 50, wH * 50 / 100 + 90);
  } else {
    text("Play", wW * 50 / 100 - 30, wH * 50 / 100 - 30);
  }
}

function btnTransformation() {
  switch (stateP - 1) {
    case -1:
      image(imgPoint3, wW * 1 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
    case 0:
      image(imgPoint3, wW * 1 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
    case 1:
      image(imgPoint1, wW * 1 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
    case 2:
      image(imgPoint2, wW * 1 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
  }
  switch (stateP + 1) {
    case 1:
      image(imgPoint1, wW * 3 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
    case 2:
      image(imgPoint2, wW * 3 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
    case 3:
      image(imgPoint3, wW * 3 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
    case 4:
      image(imgPoint1, wW * 3 / 3 - wW * 1 / 3 / 2 - 15, wH - 40, 30, 30);
      break;
  }
}

var meter = 0;
var highscore = 0;
var tSpeed = 100;
var maxSpeed = 0;

function gScore() {
  tSpeed = round(speed * 10);
  if (tSpeed > maxSpeed) {
    maxSpeed = tSpeed;
  }
  meter = round(((speed * 10000) / 3600) * (time / 60));
}

function draw() {
  back();
  start();
  aPlayer();
  aObstacles();
  aPoints();
  aTableau();

  if (help) {
    mHelp();
  } else {
    if (play) {
      if (game_over) {
        mGame_over();
      } else {
        btnTransformation();

        fill(255, 255, 255);
        if (pause) {
          triangle(wW - 40, 40, wW - 40, 10, wW - 10, 25);
        } else {
          elements();
          player();
          gScore();
          rect(wW - 40, 10, 10, 30);
          rect(wW - 20, 10, 10, 30);
        }

        aTableauTxt();
      }
    } else {
      mStart();
    }
  }
  mouseExe();
}