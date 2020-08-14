const canvas = document.getElementById('snake');
const context = canvas.getContext("2d");

//create unit
let box = 32;

//Adds an image
let foodImg = new Image();
foodImg.src = "/Assets/primary-radio.png";

let ground = new Image();
ground.src = "/Assets/dog.jpg";
 
// Add a song
let audioName = new Audio();
//audioName.src = "Assets/Chiké-Roju.mp3"; audioName.play();

//create the snake
let snake = [];
snake[0] = {x: 9*box, y: 10*box };

// The food will be created randomly so we'll make use of Math.random
let food = {
    x:Math.floor(Math.random()* 17 + 1) * box,
    y:Math.floor(Math.random()* 15 + 3) * box
};

//create the score
let score = 0;

// controls for the snake
let d;

document.addEventListener('keydown', direction);

function direction(event){
    if(event.keyCode == 37 && d != "right"){
        d = "left";
    }
    else if(event.keyCode == 38 && d != "down"){
        d = "up";
    }
    else if(event.keyCode == 39 && d != "left"){
        d = "right";
    }
    else if(event.keyCode == 40 && d != "up"){
        d = "down";
    }
}

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
        return false;
    }
}

function draw(){
    context.drawImage(ground, 0, 0);

    for(let i = 0; i < snake.length; i++){
        context.fillStyle = (i == 0) ? 'red' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);

        //creates the red border on the snake
        context.strokeStyle = 'white';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction a user clicked
    if( d == 'left') snakeX -= box;
    if( d == 'up') snakeY -= box;
    if( d == 'right') snakeX += box;
    if( d == 'down') snakeY += box;
    

    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x:Math.floor(Math.random()* 17 + 1) * box,
            y:Math.floor(Math.random()* 16 + 3) * box
        }
    }
    else{
        //remove the tail
        snake.pop();
    }

    //add new head
    let newHead = {
        x : snakeX,
        y : snakeY
    };

    //game over rules
    if (snakeX < box || snakeX > 17 * box || snakeY < 3*box || 
        snakeY > 17*box || collision(newHead, snake)){
        clearInterval(game);
    };

    snake.unshift(newHead);

    //styling for score and it's position
    context.fillStyle = 'white';
    context.font = '45px Sans serif';
    context.fillText(score, 2*box, 1.6*box);
}

let game = setInterval(draw, 200);
 