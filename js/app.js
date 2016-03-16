
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
    this.bugBooster = Math.floor((Math.random() * 4) + 2);
};

// Update the enemy's position (required)
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter, which will ensure the game runs at the same speed for all computers.
    this.x = this.x * dt * this.bugBooster + 22;
};

// Draw the enemy on the screen (required)
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//------------------------------------- PLAYER -------------------------------------
// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function(x,y) { //INITIATE PLAYER
    //Load the player image
    this.sprite = 'images/char-cat-girl.png';//images/char-cat-girl.png
    //Set player's initial location
    this.x = x;
    this.y = y;
    //boundaries
    /*boundary: {
        left: 0,
        right: 505,
        down: 606
    },
    //moves
    moves : {
        goUp: 50,
        goDown: 50,
        goRight: 50,
        goLeft: 50
    }*/
};

// Draw the player on the screen (required)
Player.prototype.render = function() {
    this.x = 200;//x
    this.y = 400;//y
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    //Receives user input via allowed keys & moves player accordingly
    //Need left, right, up & down
    //Player can NOT move off screen
    //If player hits water the game resets by moving the player back to initial location (write a separate reset Player method to handle that - see below).
    //CASE
    /*switch (allowedKeys) {

        case 'left':
            this.x -= this.sprite.moves.goLeft;//this.spriteInfo.move.rightLeft
            if (this.x < this.sprite.boundary.left) {
                this.x += this.sprite.moves.goLeft;
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
            if (this.y < this.boundary.top) {
                this.y += this.moves.goUp;
            }
            break;

        case 'down':
            this.y += this.moves.goDown;
            if (this.y > this.boundary.bottom) {
                this.y -= this.moves.goDown;
            }
            break;
    }*/
};

// Update player's position (required)
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
};

Player.prototype.reset = function() {
    //If the player hits water, the game resets and the player should move back to their initial location
    this.x = this.xo;
    this.y = this.yo;
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
// Now instantiate your objects.
// ENEMIES - Place all enemy objects in an array called "allEnemies"
var allEnemies = [];
// Set a varaiable for the possible y values
var yBugs = [0, 0, 0];//var yVals = [220, 140, 60];

// Create the separate enemy instances
for (var i = 0; i < 5; i++) {

    // Set a starting x-position based on a random value
    var x = Math.floor((Math.random() * -1000) + 1);

    // Set a starting y-position based on a random selection
    // of the 3 possible values
    var y = yBugs[Math.floor(Math.random() * 3)];

    // Create the new enemy object
    var enemy = new Enemy(x, y);

    // Push the enemy into the array
    allEnemies.push(enemy);
}
// PLAYER - place the player object in a variable called "player"
var player = new Player();

// -- Instantiate the game --
var game = new Game();
