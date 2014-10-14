var snake;
var snakeLength;
var snakeSize;

var food;

var context;
var screenWidth;
var screenHeight; 

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/30); /*this code calls a useable function in the code to make it useable*/



function gameInitialize() { /*specifies the way the game is supposed to work*/
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    /*allows the drawing 2D images for the game*/
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    /*this makes the entire screen the game screen*/
}


function gameLoop() { /*Allows the game to loop. Makes the game endless basically*/
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() { /*allows me to specifiy background clolor and other game styling drawings*/
    context.fillStyle = "rgb(104, 19, 209)"; /*fillStyle allows me to change the background color of my canvaas.*/
    context.fillRect (0, 0, screenWidth, screenHeight);
    
    
}

function snakeInitialize () {
    snake = [];
    snakeLength = 12;
    snakeSize = 20;
    
    for(var index = 0; index >= 0; index++) { /*specifies that this variable function is true as long as the index is greater than or equal to zero*/
    snake.push({ x: index, y: 0 });                                                                                   
    }
}

function snakeDraw () {
    for (var index = snakeLength; index < snake.length; index++) {
        context.fillStyle = "white";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
       
    }
    
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    snakeHead++;
    
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
    
}

function foodDraw() {
  context.fillStyle = "white";
  context.fillRect(food.x, food.y, snakeSize, snakeSize);
}
/*this function draws the snake's food on the screen*/