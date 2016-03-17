//------------------------ General ------------------------//
//If the player reaches water, the playee wins, and the game is reset
//If the player collides with a bug, the player dies, and the game is reset
//------------------------ Enemy ------------------------//
//Goal: Kill the player
//Moves: left to right along bricks at varying speeds

var Enemy = function(x,y) { //Complete the enemy function
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';//enemy image
    this.x = x;//initial x-coord
    this.y = y;//initial y-coord
    this.speed = Math.floor(Math.random() * 10);//enemy speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {//Update enemy location which will ensure the game runs at the same speed for all computers.
    this.x = (this.x * this.speed + 22) * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//------------------------ Player ------------------------//
//Goal: Reach the water
//Moves: left, right, up, down, but not off board
//Player class requires an update(), render() and a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;//initial x-coord
    this.y = 400;//initial y-coord
};

//Handle Input

// This listens for key presses and sends the keys to your Player.handleInput() method.
//You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Update
Player.prototype.update = function() {//Update enemy location which will ensure the game runs at the same speed for all computers.
    this.x = this.x;
    this.y = this.y;
};

//Render
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//------------------------ Instantiate Objects ------------------------//
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
