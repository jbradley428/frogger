
// Canvas:
//  - width: 505
//  - height: 606
// Create the game constructor to store the game variables
var Game = function() {
};

//------------------------------------- ENEMIES -------------------------------------
//Enemy constructor function
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    //
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Set enemy's initial location
    this.x = x;
    this.y = y;
    //Set enemmy's speed with Math.random()
    this.speed = Math.floor((Math.random() * 300) *2);
    //Math.floor() - returns the largest integer less than or equal to a given number
    //Math.random() - returns a pseudo random number in the range from 0-1
    //Set enemy width & height
    this.w = 101;
    this.h = 171;
};

// Update the enemy's position (required)
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter, which will ensure the game runs at the same speed for all computers.
    //this.x = this.x * dt * this.speed + 22; - my code
    this.x = this.x + this.speed * dt;//this (the bug's) x-coord is equal to the bug's original x-coord multiplied by its speed multiplied by delta
    if (this.x > 500) {//if the x-coord is less than 500
        this.x = -100;//the x-coord is equal to -100, meaning the bug is set offscreen to the left
    }
};

// Draw the enemy on the screen (required)
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//------------------------------------- PLAYER -------------------------------------
// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function(x,y,crash) {
    //Load the player image
    this.sprite = 'images/char-cat-girl.png';//images/char-cat-girl.png
    //Set player's initial location
    this.x = x;
    this.y = y;
    //Set player's width & height
    this.w = 101;
    this.h = 171;
    //boundaries
    this.boundary = {
        left: 0,
        right: 400,
        bottom: 400,
        top: 0
    };
    //moves
    this.moves = {
        goUp: 25,
        goDown: 25,
        goRight: 50,
        goLeft: 50
    };
};

// Draw the player on the screen (required)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    //Receives user input via allowed keys & moves player accordingly
    //Need left, right, up & down
    //Player can NOT move off screen
    //If player hits water the game resets by moving the player back to initial location (write a separate reset Player method to handle that - see below).
    //CASE
    switch (allowedKeys) {

        case 'left':
            this.x -= this.moves.goLeft;//this.spriteInfo.move.rightLeft
            if (this.x < this.boundary.left) {
                this.x += this.moves.goLeft;
            }
            break;

        case 'right':
            this.x += this.moves.goRight;
            if (this.x > this.boundary.right) {
                this.x -= this.moves.goRight;
            }
            break;

        case 'up':
            this.y -= this.moves.goUp;
            if (this.y < this.boundary.top) {//if the amt subtracted falls below zero
                this.y += this.moves.goUp;//add back the value of goUp
            }
            break;

        case 'down':
            this.y += this.moves.goDown;
            if (this.y > this.boundary.bottom) {
                this.y -= this.moves.goDown;
            }
            break;
    }
};

// Update player's position (required)
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.reset = function() {
    //If the player hits water, the game resets and the player should move back to their initial location
    this.x = 200;
    this.y = 400;
};

Player.prototype.checkCollisions = function () {//- Attempt 5: Ty's suggestion
    if(Math.abs(player.x - enemy.x) < player.w &&//was Enemy.x
       Math.abs(player.y - enemy.y) < player.h) {
        this.reset();
        console.log('Crrunnnchh!');
    }
};

/*Player.prototype.checkCollision = function() {//- Attempt 6: Bounding box- WTF?
    if((player.x + player.w) >= (Enemy.x) &&
        (player.x) <= (Enemy.x + Enemy.w) &&
        (player.y + player.h) >= (Enemy.y) &&
        (player.x) <= (Enemy.y + Enemy.h)) {
        console.log('Splat!');
    }
};*/

//---------------------------------- EVENT HANDLERS ---------------------------------
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

//------------------------------- INSTANTIATE OBJECTS -------------------------------
// Now instantiate your objects.
// ENEMIES - Place all enemy objects in an array called "allEnemies"

var allEnemies = [
    new Enemy(10,20),
    new Enemy(0,60),
    new Enemy(100, 100),
    new Enemy(-20, 200)

];


// PLAYER - place the player object in a variable called "player"
var player = new Player(200,400);
