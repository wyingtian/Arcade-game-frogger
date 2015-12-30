
// set up constatns variables
var constants = {
    //initial player position
    PLAYER_INI_X : 202,
    PLAYER_INI_Y : 405,
    // the distance for one control key(up, down, lef,right)
    MOVE_X : 101,
    MOVE_Y : 83,
    //bound parameters, make sure user does not go out off limit
    UPPER_BOUND :10,
    LOWER_BOUND : 405,
    RIGHT_BOUND : 404,
    LEFT_BOUND : 0,
    // Y axis array for four rows of enemies
    ROW_Y : [63, 146 , 229 , 312],
    //width of Canvas created by engine.js
    CANVAS_WIDTH:505
};

var Enemy = function(posX,posY,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = posX;
    this.y = posY;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {    
    this.x = this.x + this.speed * dt;
    // if goes off right side of the canvas, set a random start point
    // on the left side
    if(this.x > constants.CANVAS_WIDTH) {
        this.x = RandomStartPosX(-1000, 0);
    }
    
};

// Returns a random number between min (inclusive) and max (exclusive)
function RandomStartPosX(min, max) {
  return Math.random() * (max - min) + min;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset Enemies Clear all enemies from the canvas

Enemy.prototype.reset =function(){
        //make enemies array empty to reset enemy
        allEnemies=[];
};


// player class 
var Player = function() {
    //X, Y co-rdinates of the player
    this.x = constants.PLAYER_INI_X;
    this.y = constants.PLAYER_INI_Y;
    this.person = 'images/char-boy.png';
    this.collisionWidth = 30;
    this.collisionHeight = 30;
};

// check collision method for one target
Player.prototype.checkCollision = function(target) {
    if (Math.abs(this.x - target.x) < this.collisionWidth && Math.abs(this.y - target.y) < this.collisionHeight) {
        this.reset();
        //delete all current enemies
        allEnemies=[];
        //create enemies for new game
        spawn(20,500);
    }
};

// check collision method for a target array, calls checkCollision(target) method
Player.prototype.checkCollisionArray = function(targets){
     if (targets.constructor === Array) {
        var target;
        for (var i = 0; i < targets.length; i++){
            target = targets[i];
            this.checkCollision(target); 
        }
    }
    else {
        this.checkCollision(target);
    }
};

//Draw the player on the canvas.
Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.person),this.x,this.y);
};

//Update player movements, track score and collisions
Player.prototype.update = function() {
    if(this.y < constants.ROW_Y[0]){
        Enemy.prototype.reset();
        this.reset();
    }
    this.checkCollisionArray(allEnemies);
};

//reset player position to initla position
Player.prototype.reset = function(){
    this.x = constants.PLAYER_INI_X;
    this.y = constants.PLAYER_INI_Y;
};

//Update player movements based on keyboard inputs
//Player can move up, down, left and right and
//limit movement within the canvas
Player.prototype.handleInput = function(key){
    switch (key){
        case 'left':
            if(this.x > constants.LEFT_BOUND)
                this.x = this.x - constants.MOVE_X;
            break;
        case 'up':
            if(this.y > constants.UPPER_BOUND)
            this.y = this.y - constants.MOVE_Y;
             break;
        case 'right':
            if(this.x < constants.RIGHT_BOUND)
            this.x = this.x + constants.MOVE_X;
             break; 
        case 'down':
            if(this.y < constants.LOWER_BOUND)
            this.y = this.y + constants.MOVE_Y;
             break;
    }
};


// Gem class
var Gem = function(posX,posY){
    this.X = posX;
    this.Y = posY;
    this.gem = ['images/Gem-Blue.png','images/Gem-Green','images/Gem-Orange'];
    this.collisionWidth = 30;
    this.collisionHeight = 30;
};

//Draw the Gem on the canvas.
Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.gem[]),this.x,this.y);
};

//Update player movements, track score and collisions
Player.prototype.update = function() {
    if(this.y < constants.ROW_Y[0]){
        Enemy.prototype.reset();
        this.reset();
    }
    this.checkCollisionArray(allEnemies);
};

//reset player position to initla position
Player.prototype.reset = function(){
    this.x = constants.PLAYER_INI_X;
    this.y = constants.PLAYER_INI_Y;
};
// create a new Gems object
var gems = new Gems();

// Place all enemy objects in an array called allEnemies
var allEnemies = [];


// spawn enemies, enemyNum and speed as input,
// if input enemyNum is less than 4, it will be treated as 4
// to make sure each row has at least one enemy
function spawn(enemyNum,speed){
    // each row has at least one enemy
    for(var i = 0 ; i < constants.ROW_Y.length ; i++){
        var randomPos1 = RandomStartPosX(-500,constants.CANVAS_WIDTH);
        allEnemies.push(new Enemy(randomPos1, constants.ROW_Y[i], speed));
    }
    // for the rest of the Enemy, randomly appear at onw row.
    //  generate the rest of the enemies randomly at certain row
    var rest = enemyNum - 4 ;
    for(var j = 0; j < rest ; j++){
        var randomPos2 = Enemy(RandomStartPosX(-1000,constants.CANVAS_WIDTH));
        // randomly chose a row for enemy
        allEnemies.push(new Enemy(randomPos2,constants.ROW_Y[Math.floor(Math.random()*constants.ROW_Y.length)],speed));
    }
};

// call spawn 
// TODO: add difficult leveal function based on this later
spawn(20,500);
// Place the player object in a variable called player
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});





