var snake;
var snake2;
var coins = [];
var goodCoins = [];
var stopGame = false;
var snake1Won = false;
var reset = false;
var tied = false;
var startGame = true;
var gridEnabled = true;

var redScore = 0;
var greenScore = 0;

function setup() {
    createCanvas(1365, 749);
    setUpMainMenu();

    frameRate(12);

    snake = new Snake(0, 10, 10, 255, 0, 0);
    snake2 = new Snake(1, 52, 10, 0, 255, 0);
}

function draw() {

    background(50);

    if (startGame) {
        drawMainMenu();
        return;
    }

    if(reset){
        snake = new Snake(0, 10, 10, 255, 0, 0);
        snake2 = new Snake(1, 52, 10, 0, 255, 0);
        reset = false;
        stopGame = false;
        coins.splice(0, coins.length);
        tied = false;
    }

    if (stopGame) {
        textSize(62);
        textAlign(CENTER);
        if (tied) {
            fill(255,255,0);
            text("Tie No snakes won", width / 2, height / 2 - 70);
            textSize(32);
            text("Press ENTER to play again", width / 2, height / 2);
        } else if (snake1Won){
            fill(255, 0, 0);
            text("Snake 1 wins", width / 2, height / 2 - 70);
            textSize(32);
            text("Press ENTER to play again", width / 2, height / 2);
        } else {
            fill(0, 255, 0);
            text("Snake 2 wins", width / 2, height / 2 - 70);
            textSize(32);
            text("Press ENTER to play again", width / 2, height / 2);
        }
        textSize(62);
        fill(255, 0, 0);
        text(redScore, width / 4, height / 2);
        fill(0,255, 0);
        text(greenScore,3* width / 4, height / 2);
        return;
    }

    //Draw grid
    if (gridEnabled) {
        for (var i = 0; i < 1364; i += 22) {
            stroke(110);
            line(i, 0, i, 764);
        }
        for (var i = 0; i < 764; i += 22) {
            stroke(110);
            line(0, i, 1364, i);
        }
    }

    snake.move();
    snake2.move();
    snake.update();
    snake2.update();
    
    manageCoins();
    if (snake2.died && snake.died) {
        tied = true;
    }
    else if (stopGame) {
        if (snake1Won) {
            redScore++;
        } else {
            greenScore++;
        }
        return;
    }

    drawCoins();
    snake.drawSnake();
    snake2.drawSnake();

}

function manageCoins() {
    if (coins.length < NumberOfCoins - (NumberOfCoins * percentBitCoins)) {
        coins.push(genCoin());
    }
    if (goodCoins.length < Math.floor(NumberOfCoins * percentBitCoins)) {
        goodCoins.push(genCoin());
    }
}

function genCoin() {
    var x = Math.floor(Math.random() * 62);
    var y = Math.floor(Math.random() * 34);

    var interferes = false;

    for (var i = 0; i < snake.positions.length; i++) {
        if ((snake.positions[i].x == x) && (snake.positions[i].y == y))
            interferes = true;
    }
    for (var i = 0; i < snake2.positions.length; i++) {
        if ((snake2.positions[i].x == x) && (snake2.positions[i].y == y))
            interferes = true;
    }
    for (var i = 0; i < coins.length; i++) {
        if ((coins[i].x == x) && (coins[i].y == y))
            interferes = true;
    }
    for (var i = 0; i < goodCoins.length; i++) {
        if ((goodCoins[i].x == x) && (goodCoins[i].y == y))
            interferes = true;
    }
    if (interferes) {
        return genCoin();
    }
    else {
        return new vec2(x, y);
    }
}

function drawCoins() {
    for (var i = 0; i < coins.length; i++) {
        fillSquare(coins[i].x, coins[i].y, 255, 255, 0);
    }
    for (var i = 0; i < goodCoins.length; i++) {
        fillSquare(goodCoins[i].x, goodCoins[i].y, 255, 153, 0);
    }
}

function fillSquare(xSquare, ySquare, r, g, b) {
    fill(r, g, b);

    stroke(r,g,b);
    rect((xSquare * 22) + 1, ((ySquare) * 22) + 1, 20, 20);
}

function vec2(x,y) {
    this.x = x;
    this.y = y;
}

function Snake(id,x,y,r,g,b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.id = id;
    this.died = false;
    /*
        0 Up
        1 Right
        2 Down
        3 Left
    */
    this.direction = 0;
    this.desiredDirection = 0;
    this.positions = [];
    this.length = 3;

    this.move = function() {
        this.direction = this.desiredDirection;
        switch (this.direction) {
            case 0:
                this.y += 1;
                break;
            case 1:
                this.x += 1;
                break;
            case 2:
                this.y -= 1;
                break;
            case 3:
                this.x -= 1;
                break;
        }

    }

    this.update = function () {

        if (snake.x == snake2.x && snake.y == snake2.y) {
            this.die();
        }

        //Check for collision with self and other snake
        for (var i = 0; i < snake.positions.length; i++) {
            if (snake.positions[i].x === this.x && snake.positions[i].y == this.y) {
                console.log(this.id + " Collided with snake 0 ");
                this.die();
            }
        }

        for (var i = 0; i < snake2.positions.length; i++) {
            if (snake2.positions[i].x === this.x && snake2.positions[i].y == this.y) {
                console.log(this.id + " Collided with snake 1 ");
                this.die();
            }
        }

        //Ckeck for boundry collision
        if (this.x < 0 || this.x > 61 || this.y < 0 || this.y > 33) {
            this.die();
        }

        //Check if coin was collected
        for (var i = 0; i < coins.length; i++) {
            if (coins[i].x === this.x && coins[i].y == this.y) {
                this.length+=2;
                coins.splice(i,1);
            }
        }
        //Check if mega coin was collected
        for (var i = 0; i < goodCoins.length; i++) {
            if (goodCoins[i].x === this.x && goodCoins[i].y == this.y) {
                this.length += 10;
                goodCoins.splice(i, 1);
            }
        }
        this.positions.push(new vec2(this.x, this.y));
        if (this.positions.length > this.length) {
            this.positions.splice(0, 1);
        }
    }

    this.drawSnake = function () {
        for (var i = 0; i < this.positions.length; i++) {
            var trigValue = 100* Math.cos((this.positions.length - i) / 3);
            fillSquare(this.positions[i].x, this.positions[i].y, this.r + trigValue, this.g + trigValue, this.b + trigValue);
        }
    };

    this.die = function () {
        this.died = true;
        stopGame = true;
        if (this.id === 0) {
            snake1Won = false;
        } else {
            snake1Won = true;
        }
    };
}

function keyPressed() {
    if (keyCode === 87) {
        if (snake.direction!= 0)
            snake.desiredDirection = 2;
    } else if (keyCode === 65) {
        if (snake.direction != 1)
            snake.desiredDirection = 3;
    } else if (keyCode === 83) {
        if (snake.direction != 2)
            snake.desiredDirection = 0;
    } else if (keyCode === 68) {
        if (snake.direction != 3)
            snake.desiredDirection = 1;
    }

    if (keyCode === UP_ARROW) {
        if (snake2.direction != 0)
            snake2.desiredDirection = 2;
    } else if (keyCode === LEFT_ARROW) {
        if (snake2.direction != 1)
            snake2.desiredDirection = 3;
    } else if (keyCode === DOWN_ARROW) {
        if (snake2.direction != 2)
            snake2.desiredDirection = 0;
    } else if (keyCode === RIGHT_ARROW) {
        if (snake2.direction != 3)
            snake2.desiredDirection = 1;
    }

    if (keyCode === 71) {
        gridEnabled = !gridEnabled;
    }

    if (keyCode === ENTER && stopGame) {
        reset = true;
    }
    if (keyCode === ENTER && startGame) {
        startGame = false;
        destroyMainMenu();
    }
}

function setSpeed(speed) {

    frameRate(speed);
}