
var speedSlider;
var coinSlider;
var bitcoinPercentSlider;

var SnakeSpeed;
var NumberOfCoins;
var percentBitCoins;

function setUpMainMenu() {
    speedSlider = createSlider(0, 6, 1,2);
    speedSlider.position((width / 4.5)-50, height / 3.5);
    speedSlider.style('width', '100px');

    coinSlider = createSlider(0, 35, 6, 1);
    coinSlider.position((width / 2) - 50, height / 3.5);
    coinSlider.style('width', '100px');

    bitcoinPercentSlider = createSlider(0, 100, 20, 1);
    bitcoinPercentSlider.position((3.5 * width / 4.5) - 50, height / 3.5);
    bitcoinPercentSlider.style('width', '100px');
}

function drawMainMenu() {
    textSize(62);
    textAlign(CENTER);
    fill(255, 255, 0);
    text("Multi Player Snake", width / 2, height / 8);
    textSize(30);

    var speedText = "Value";

    SnakeSpeed = speedSlider.value();
    switch (SnakeSpeed) {
        case 0:
            speedText = "Very Sloooow";
            break;
        case 1:
            speedText = "Slow";
            break;
        case 2:
            speedText = "Average";
            break;
        case 3:
            speedText = "Faster"
            break;
        case 4:
            speedText = "Fast"
            break;
        case 5:
            speedText = "Very Fast";
            break;
        case 6:
            speedText = "Expect Lag";
            break;
    }

    text("Speed: " + speedText, (width / 4.5), height / 4);

    text("# of coins: " + coinSlider.value(), (width / 2), height / 4);

    NumberOfCoins = coinSlider.value();

    text("% of bitcoins: " + bitcoinPercentSlider.value() + "%", 3.5 * (width / 4.5), height / 4);
    percentBitCoins = bitcoinPercentSlider.value() / 100;

    textAlign(CENTER);
    text("Press ENTER to coninue", width / 2, height / 2);
    text("Red uses WASD", width / 2, height / 2 + 50);
    text("Green uses Arrows", width / 2, height / 2 + 100);
    textSize(62);
    fill(255, 0, 0);
    text(redScore, width / 4, height / 2);
    fill(0, 255, 0);
    text(greenScore, 3 * width / 4, height / 2);
}

function destroyMainMenu() {
    switch (SnakeSpeed) {
        case 0:
            setSpeed(2);
            break;
        case 1:
            setSpeed(6);
            break;
        case 2:
            setSpeed(12);
            break;
        case 3:
            setSpeed(24);
            break;
        case 4:
            setSpeed(36);
            break;
        case 5:
            setSpeed(48);
            break;
        case 6:
            setSpeed(60);
            break;
    }
    speedSlider.remove();
    coinSlider.remove();
    bitcoinPercentSlider.remove();
}

/*Original main menu code
    textSize(62);
    textAlign(CENTER);
    fill(255, 255, 0);
    text("Multi Player Snake", width / 2, height / 2 - 70);
    textSize(32);
    text("Press ENTER to start", width / 2, height / 2);
    textAlign(CENTER);
    text("Red uses WASD", width / 2, height / 2 + 50);
    text("Green uses Arrows", width / 2, height / 2 + 100);
    textSize(62);
    fill(255, 0, 0);
    text(redScore, width / 4, height / 2);
    fill(0, 255, 0);
    text(greenScore, 3 * width / 4, height / 2);
    */
