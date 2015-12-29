var constants = {
    // Initla player X position

    PLAYER_INI_X : 202,
    PLAYER_INI_Y : 83*5-10,
    MOVE_X : 101,
    MOVE_Y : 83,
    UPPER_BOUND :10,
    LOWER_BOUND : 83*5-10,
    RIGHT_BOUND : 404,
    LEFT_BOUND : 0,
    ENEMY_ROW_Y1: 63,
    ENEMY_ROW_Y2: 146,
    ENEMY_ROW_Y3: 229,
    ENEMY_ROW_Y4: 312,
    EASY_SPEED: 100,
    MED_SPEED: 200,
    HARD_SPEED:300,
    CANVAS_WIDTH:505
};

var ROW_Y = [63, 146 , 229 , 312];
//canvas = document.getElementsByTagName('canvas');
// console.log(canvas.width);
// Enemies our player must avoid

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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x = this.x + this.speed * dt;
  
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



/* Reset Enemies
 * Clear all enemies from the canvas
 */
Enemy.prototype.reset =function(){
       // var enemyCount = allEnemies.length;
       // for(var i = 0; i < enemyCount; i++) {
       //  allEnemies=[];
       // }
       allEnemies=[];
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //X, Y co-rdinates of the player
    this.x = constants.PLAYER_INI_X;
    this.y = constants.PLAYER_INI_Y;
    this.person = 'images/char-boy.png';
    this.collisionWidth = 30;
    this.collisionHeight = 30;
};

Player.prototype.checkCollision = function(target) {
    if (Math.abs(this.x - target.x) < this.collisionWidth && Math.abs(this.y - target.y) < this.collisionHeight) {
        this.reset();
        allEnemies=[];
        spawn(20,500);
    }
};

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
    if(this.y < constants.ENEMY_ROW_Y1){
        Enemy.prototype.reset();
        this.reset();
    }
    this.checkCollisionArray(allEnemies);
};


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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// spawn enemies, EnemyNum and speed as input,
// if input EnemyNum is less than 4, it will be treated as 4
// to make sure each row has at least one enemy
function spawn(EnemyNum,speed){
    // each row has at least one enemy
    for(var i = 0 ; i < ROW_Y.length ; i++){
        var randomPos1 = RandomStartPosX(-500,constants.CANVAS_WIDTH);
        allEnemies.push(new Enemy(randomPos1, ROW_Y[i], speed));
    }
    // for the rest of the Enemy, randomly appear at onw row.
    //  generate the rest of the enemies randomly at certain row
    var rest = EnemyNum - 4 ;
    for(var j = 0; j < rest ; j++){
        var randomPos2 = Enemy(RandomStartPosX(-1000,constants.CANVAS_WIDTH));
        allEnemies.push(new Enemy(randomPos2,ROW_Y[Math.floor(Math.random()*ROW_Y.length)],speed));
    }
};

// call spawn 
// TO DO add difficult leveal function based on this later
spawn(20,500);

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





