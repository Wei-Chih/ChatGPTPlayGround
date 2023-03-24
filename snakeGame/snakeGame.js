var SnakeGame = /** @class */ (function () {
    function SnakeGame() {
        this.gridSize = 20;
        this.snake = [];
        this.food = { x: 0, y: 0 };
        this.dx = 0;
        this.dy = 0;
        this.canvas = document.getElementById("gameCanvas");
        this.context = this.canvas.getContext("2d");
        this.reset();
    }
    SnakeGame.prototype.reset = function () {
        var _this = this;
        this.snake = [{ x: 200, y: 200 }];
        this.dx = this.gridSize;
        this.dy = 0;
        this.spawnFood();
        if (this.gameInterval)
            clearInterval(this.gameInterval);
        this.gameInterval = setInterval(function () { return _this.update(); }, 100);
    };
    SnakeGame.prototype.update = function () {
        var newX = this.snake[0].x + this.dx;
        var newY = this.snake[0].y + this.dy;
        if (newX < 0 || newY < 0 || newX >= this.canvas.width || newY >= this.canvas.height || this.checkCollision(newX, newY)) {
            this.reset();
            return;
        }
        if (newX === this.food.x && newY === this.food.y) {
            this.spawnFood();
        }
        else {
            this.snake.pop();
        }
        this.snake.unshift({ x: newX, y: newY });
        this.draw();
    };
    SnakeGame.prototype.draw = function () {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#f00";
        this.context.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);
        this.context.fillStyle = "#0f0";
        for (var _i = 0, _a = this.snake; _i < _a.length; _i++) {
            var part = _a[_i];
            this.context.fillRect(part.x, part.y, this.gridSize, this.gridSize);
        }
    };
    SnakeGame.prototype.checkCollision = function (x, y) {
        for (var _i = 0, _a = this.snake; _i < _a.length; _i++) {
            var part = _a[_i];
            if (part.x === x && part.y === y) {
                return true;
            }
        }
        return false;
    };
    SnakeGame.prototype.spawnFood = function () {
        var x;
        var y;
        do {
            x = Math.floor(Math.random() * this.canvas.width / this.gridSize) * this.gridSize;
            y = Math.floor(Math.random() * this.canvas.height / this.gridSize) * this.gridSize;
        } while (this.checkCollision(x, y));
        this.food = { x: x, y: y };
    };
    return SnakeGame;
}());
var game = new SnakeGame();
document.addEventListener("keydown", function (e) {
    var key = e.key;
    if (key === "ArrowUp" && game.dy === 0) {
        game.dx = 0;
        game.dy = -game.gridSize;
    }
    else if (key === "ArrowDown" && game.dy === 0) {
        game.dx = 0;
        game.dy = game.gridSize;
    }
    else if (key === "ArrowLeft" && game.dx === 0) {
        game.dx = -game.gridSize;
        game.dy = 0;
    }
    else if (key === "ArrowRight" && game.dx === 0) {
        game.dx = game.gridSize;
        game.dy = 0;
    }
});
