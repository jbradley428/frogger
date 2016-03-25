
// Canvas:
//  - width: 505
//  - height: 606
// Create the game constructor to store the game variables

//------------------------------------- ENEMIES -------------------------------------
//Enemy constructor function
var Enemy = function(x,y) {
    //Variables applied to each of our instances go here, we've provided one for you to get started
    //The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Set enemy's initial location
    this.x = x;
    this.y = y;
    //Set enemmy's speed with Math.random()
    this.speed = Math.floor((Math.random() * 100) *2);
    //Math.floor() - returns the largest integer less than or equal to a given number
    //Math.random() - returns a pseudo random number in the range from 0-1
    //Set enemy width & height
    this.w = 80;//101
    this.h = 80;//171
};

// Update the enemy's position (required)
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter, which will ensure the game runs at the same speed for all computers.
    this.x = this.x + this.speed * dt;//this (the bug's) x-coord is equal to the bug's original x-coord added to speed multiplied by delta
    if (this.x > 500) {//if the x-coord is less than 500
        this.x = -100;//the x-coord is equal to -100, meaning the bug is set offscreen to the left.
    }
};

// Draw the enemy on the screen (required)
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//------------------------------------- PLAYER -------------------------------------
// This class requires an update(), render() and a handleInput() method.
var Player = function(x,y,crash) {
    //Load the player image
    this.sprite = 'images/char-cat-girl.png';
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
        bottom: 400
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
    //If player hits water the game resets by moving the player back to initial location.
    switch (allowedKeys) {

        case 'left':
            this.x -= this.moves.goLeft;
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
            if (this.y < this.boundary.top) { //if the amt subtracted falls below zero
                this.y += this.moves.goUp;    //add back the value of goUp
            }else if (this.y < 0){            //resets player to start position when she hits water
                this.reset();
                console.log("You Won!");
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
// Return player to her initial position if she reaches rhe water or collides with an enemy
Player.prototype.reset = function() {
    this.x = 200;//x-position
    this.y = 400;//y-position
};


Player.prototype.checkCollisions = function (enemy) {
    if(Math.abs(player.x - enemy.x) < enemy.w &&//If the absolute value of the difference between player and enemy x-positions is less than 80 (enemy width), and
       Math.abs(player.y - enemy.y) < enemy.h) {//the absolute value of the difference between player and enemy y-positions is less than 80 (enemy height):
        this.reset();                           // - return the player to her original position (200, 400),
        console.log('Crash!');                  // - log "Crash!" in the console.
    }
};

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
// ENEMIES - Place all enemy objects in an array called "allEnemies"

var allEnemies = [];

allEnemies.push(new Enemy(-50,60)); //top enemy
allEnemies.push(new Enemy(0,120));  //middle enemy
allEnemies.push(new Enemy(-20,200)) //bottom enemy



// PLAYER - place the player object in a variable called "player"
var player = new Player(200,400);
