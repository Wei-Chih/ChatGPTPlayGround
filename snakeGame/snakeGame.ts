class SnakeGame {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    public gridSize: number = 20;
    private snake: { x: number; y: number }[] = [];
    private food: { x: number; y: number } = { x: 0, y: 0 };
    public dx: number = 0;
    public dy: number = 0;
    private gameInterval: number | undefined;

    constructor() {
        this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.reset();
    }

    private reset(): void {
        this.snake = [{ x: 200, y: 200 }];
        this.dx = this.gridSize;
        this.dy = 0;
        this.spawnFood();
        if (this.gameInterval) clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => this.update(), 100);
    }

    private update(): void {
        const newX = this.snake[0].x + this.dx;
        const newY = this.snake[0].y + this.dy;

        if (newX < 0 || newY < 0 || newX >= this.canvas.width || newY >= this.canvas.height || this.checkCollision(newX, newY)) {
            this.reset();
            return;
        }
        if (newX === this.food.x && newY === this.food.y) {
            this.spawnFood();
        } else {
            this.snake.pop();
        }

        this.snake.unshift({ x: newX, y: newY });

        this.draw();
    }

    private draw(): void {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "#f00";
        this.context.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);

        this.context.fillStyle = "#0f0";
        for (const part of this.snake) {
            this.context.fillRect(part.x, part.y, this.gridSize, this.gridSize);
        }
    }

    private checkCollision(x: number, y: number): boolean {
        for (const part of this.snake) {
            if (part.x === x && part.y === y) {
                return true;
            }
        }
        return false;
    }

    private spawnFood(): void {
        let x: number;
        let y: number;
        do {
            x = Math.floor(Math.random() * this.canvas.width / this.gridSize) * this.gridSize;
            y = Math.floor(Math.random() * this.canvas.height / this.gridSize) * this.gridSize;
        } while (this.checkCollision(x, y));
        this.food = { x, y };
    }
}

const game = new SnakeGame();

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "ArrowUp" && game.dy === 0) {
        game.dx = 0;
        game.dy = -game.gridSize;
    } else if (key === "ArrowDown" && game.dy === 0) {
        game.dx = 0;
        game.dy = game.gridSize;
    } else if (key === "ArrowLeft" && game.dx === 0) {
        game.dx = -game.gridSize;
        game.dy = 0;
    } else if (key === "ArrowRight" && game.dx === 0) {
        game.dx = game.gridSize;
        game.dy = 0;
    }
});