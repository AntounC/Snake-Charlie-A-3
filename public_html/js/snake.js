var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

var gameState;
var gameOverMenu;
var reestartButton;

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000 / 30); /*this code calls a usable function in the code to make it functional*/
setFoodPosition();


function gameInitialize() { /*specifies the way the game is supposed to work*/
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    /*allows the drawing 2D images for the game*/

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;
    /*this makes the entire screen the game screen*/

    document.addEventListener("keydown", keyboardHandler);

    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);
    
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);
    setState("PLAY");
}


function gameLoop() { /*Allows the game to loop. Makes the game endless basically*/
    gameDraw();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() { /*allows me to specifiy background clolor and other game styling drawings*/
    context.fillStyle = "rgb(104, 19, 209)"; /*fillStyle allows me to change the background color of my canvaas.*/
    context.fillRect(0, 0, screenWidth, screenHeight);

}

function gameRestart() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");
}

/*------------------------------------------------------------------------------
 * Snake Functions
 * -----------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    snakeDirection = "down";

    for (var index = snakeLength - 1; index >= 0; index--) { /*specifies that this variable function is true as long as the index is greater than or equal to zero*/
        snake.push({x: index, y: 0});
    }
}

function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "red";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);

    }

}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection == "down") {
        snakeHeadY++;
    }

    else if (snakeDirection == "right") {
        snakeHeadX++;
    }

    else if (snakeDirection == "up") {
        snakeHeadY--;

    }

    else if (snakeDirection == "left") {
        snakeHeadX--;

    }

    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY); /*calls on functions to make them functional*/

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}
/*this function draws the snake's food on the screen*/


function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize); /*sets the Snake's food to spawn at a random place on the canvas*/

}

/* -------------------------------------------------------------------------
 * Input Functions
 * -------------------------------------------------------------------------
 */

function keyboardHandler(event) {
    console.log(event);

    if (event.keyCode == "68" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if (event.keyCode == "83" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    if (event.keyCode == "65" && snakeDirection != "right") {
        snakeDirection = "left";
    }
    else if (event.keyCode == "87" && snakeDirection != "down") {
        snakeDirection = "up";
    }
}

/*--------------------------------------------------------------------------
 * Collision Handling 
 *--------------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0

        });
        snakeLength++;
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("GAME OVER");
    }

}


/*------------------------------------------------------------------------------
 * Game State handling
 * -----------------------------------------------------------------------------
 */

function setState(state) {
    gameState = state;
    showMenu(state);
}

/*------------------------------------------------------------------------------
 * Menu Functions
 * -----------------------------------------------------------------------------
 */

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offesetWidth / 2) + "px";
}