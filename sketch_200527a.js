let Lsoldiers = [];
let Rsoldiers = [];
let Usoldiers = [];
let Dsoldiers = [];
let dead = [];

let speed = 0;
let score = 0;
let tick = 0;

let scoreElem;

function setup() {
    scoreElem = createDiv('');
    scoreElem.position(820, 350);
    scoreElem.id = 'score';
    scoreElem.style('color', 'red');
    scoreElem.style('font-size', 60 + 'px');

    createCanvas(1600, 900);
    frameRate(60);
    let button = createButton("Start/Restart");
    button.style('font-size', 30 + 'px')
    button.position(50, 100);
    button.mousePressed(resetSketch);
    noLoop();
}


function draw() {
    tick++;

    //主体部分生成
    background(255);

    fill(0);
    textSize(24);
    text("Use WASD to shot the RED square !", 50, 350);
    text("And avoid them reaching the center !", 50, 400);
    text("But DON'T shot the Blue square !", 50, 450);

    textSize(54);
    text("SCORE: ", 50, 250);
    text(score, 260, 250);

    rectMode(CORNER);
    fill(255);
    rect(600, 100, 800, 800);

    translate(1000, 500);

    fill(0);
    ellipse(0, 0, 20);

    let sides = ['left', 'right', 'up', 'down'];
    let side = random(sides);
    let is_enemy = random(-1, 1);

    //随机生成soldier并存入数组
    speed += deltaTime / 1000;
    if (speed > 0.25) {
        if (side == 'left') {
            let Lsoldier = {
                x: -400,
                y: -10,
                type: is_enemy
            };
            Lsoldiers.push(Lsoldier);
        }
        if (side == 'right') {
            let Rsoldier = {
                x: 380,
                y: -10,
                type: is_enemy
            };
            Rsoldiers.push(Rsoldier);
        }
        if (side == 'up') {
            let Usoldier = {
                x: -10,
                y: -400,
                type: is_enemy
            };
            Usoldiers.push(Usoldier);
        }
        if (side == 'down') {
            let Dsoldier = {
                x: -10,
                y: 380,
                type: is_enemy
            };
            Dsoldiers.push(Dsoldier);
        }
        speed = 0;
    }

    //根据数组生成soldier
    for (let i = 0; i < Lsoldiers.length; i++) {
        let Lsoldier = Lsoldiers[i];
        if (Lsoldier.type > 0) {
            fill('red');
            rect(Lsoldier.x, Lsoldier.y, 20, 20);
        } else {
            fill('blue');
            rect(Lsoldier.x, Lsoldier.y, 20, 20);
        }
    }
    for (let i = 0; i < Rsoldiers.length; i++) {
        let Rsoldier = Rsoldiers[i];
        if (Rsoldier.type > 0) {
            fill('red');
            rect(Rsoldier.x, Rsoldier.y, 20, 20);
        } else {
            fill('blue');
            rect(Rsoldier.x, Rsoldier.y, 20, 20);
        }
    }
    for (let i = 0; i < Usoldiers.length; i++) {
        let Usoldier = Usoldiers[i];
        if (Usoldier.type > 0) {
            fill('red');
            rect(Usoldier.x, Usoldier.y, 20, 20);
        } else {
            fill('blue');
            rect(Usoldier.x, Usoldier.y, 20, 20);
        }
    }
    for (let i = 0; i < Dsoldiers.length; i++) {
        let Dsoldier = Dsoldiers[i];
        if (Dsoldier.type > 0) {
            fill('red');
            rect(Dsoldier.x, Dsoldier.y, 20, 20);
        } else {
            fill('blue');
            rect(Dsoldier.x, Dsoldier.y, 20, 20);
        }
    }

    //soldier向中心移动
    for (let i = 0; i < Lsoldiers.length; i++) {
        let Lsoldier = Lsoldiers[i];
        if (Lsoldier.x >= -10) {
            if (Lsoldier.type > 0) {
                gameOver();
            } else {
                score++;
            }
            Lsoldiers.splice(i, 1);
        }
        if (Lsoldier.x < -10) {
            Lsoldier.x += 4;
        }
    }
    for (let i = 0; i < Rsoldiers.length; i++) {
        let Rsoldier = Rsoldiers[i];
        if (Rsoldier.x <= 10) {
            if (Rsoldier.type > 0) {
                gameOver();
            } else {
                score++;
            }
            Rsoldiers.splice(i, 1);
        }
        if (Rsoldier.x > 10) {
            Rsoldier.x -= 4;
        }
    }
    for (let i = 0; i < Usoldiers.length; i++) {
        let Usoldier = Usoldiers[i];
        if (Usoldier.y >= -10) {
            if (Usoldier.type > 0) {
                gameOver();
            } else {
                score++;
            }
            Usoldiers.splice(i, 1);
        }
        if (Usoldier.y < -10) {
            Usoldier.y += 4;
        }
    }
    for (let i = 0; i < Dsoldiers.length; i++) {
        let Dsoldier = Dsoldiers[i];
        if (Dsoldier.y <= 10) {
            if (Dsoldier.type > 0) {
                gameOver();
            } else {
                score++;
            }
            Dsoldiers.splice(i, 1);
        }
        if (Dsoldier.y > 10) {
            Dsoldier.y -= 4;
        }
    }

    //死亡标记
    for (let i = 0; i < dead.length; i++) {
        let death = dead[i];
        textSize(30);
        if (death.type > 0) {
            fill('red');
            text('x', death.x, death.y);
        } else {
            fill('blue');
            text('x', death.x, death.y);
        }
        dead.splice(i, 1);
    }
}

function keyPressed() {
    //按键互动
    if (key == 'W' || key == 'w') {
        if (Usoldiers[0].type > 0) {
            score++;
        } else {
            gameOver();
        }
        dead.push(Usoldiers[0]);
        Usoldiers.splice(0, 1);
    }
    if (key == 'A' || key == 'a') {
        if (Lsoldiers[0].type > 0) {
            score++;
        } else {
            gameOver();
        }
        dead.push(Lsoldiers[0]);
        Lsoldiers.splice(0, 1);
    }
    if (key == 'S' || key == 's') {
        if (Dsoldiers[0].type > 0) {
            score++;
        } else {
            gameOver();
        }
        dead.push(Dsoldiers[0]);
        Dsoldiers.splice(0, 1);
    }
    if (key == 'D' || key == 'd') {
        if (Rsoldiers[0].type > 0) {
            score++;
        } else {
            gameOver();
        }
        dead.push(Rsoldiers[0]);
        Rsoldiers.splice(0, 1);
    }
}

function gameOver() {
    noLoop();
    scoreElem.html('Game Over!!!');
}

function resetSketch() {
    //重置
    Lsoldiers.splice(0, Lsoldiers.length);
    Rsoldiers.splice(0, Rsoldiers.length);
    Usoldiers.splice(0, Usoldiers.length);
    Dsoldiers.splice(0, Dsoldiers.length);
    dead.splice(0, dead.length);
    score = 0;
    speed = 0;
    scoreElem.html('');
    loop();
}