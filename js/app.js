// Enemies our player must avoid

var Enemy = function(posX,posY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = posX;
    this.y = posY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //X, Y co-rdinates of the player
    this.x = 202;
    this.y = 556;
    this.person = 'images/char-boy.png';
};


//Draw the player on the canvas.
Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.person),this.x,this.y);
};

//Update player movements, track score and collisions
Player.prototype.update = function() {
};

//Update player movements based on keyboard inputs
//Player can move up, down, left and right and
//limit movement within the canvas
Player.prototype.handleInput = function(key){
    switch (key){
        case 'left':
            this.x = this.x - 100;
            
        
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [ new Enemy(0, 60), new Enemy(101, 150), new Enemy(202, 235), new Enemy(0, 321)];

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





