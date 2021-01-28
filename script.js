let cols, rows, currentCell, cellSize;
let grid = [];
let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;

class Walls {
    constructor() {
        Walls.top = true;
        Walls.bottom = true;
        Walls.left = true;
        Walls.right = true;
    }
}


class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.isVisited = false;
        this.walls = new Walls();
        this.walls.left = true;
        this.walls.top = true;
        this.walls.bottom = true;
        this.walls.right = true;
        this.destination = false;
    }

    getUnvisitedNeighbors() {
        let unvisitedNeighbors = [];
        let dy = [0, 0, -1, 1];
        let dx = [1, -1, 0, 0];
        for (var i = 0; i < dy.length; i++) {
            let x = dx[i] + this.i;
            let y = dy[i] + this.j;
            if (x >= 0 && x < grid.length && y >= 0 && y < grid[x].length) { // if it's valid index
                if (!grid[x][y].isVisited) {
                    unvisitedNeighbors.push(grid[x][y]);
                }
            }
        }
        let idx = Math.floor(Math.random() * unvisitedNeighbors.length);
        return unvisitedNeighbors[idx]; // if there is no unvisitedNeighbors then it will be undefined
    }

    show() {
        let x = (this.i);
        let y = (this.j);
        ctx.strokeStyle = "red";
        ctx.fillRect = "red"
        ctx.lineWidth = 2;

        if (this.walls.top) {
            drawWall(x * cellSize, y * cellSize, x * cellSize + cellSize, y * cellSize);
        }
        if (this.walls.right === true) {
            drawWall(x * cellSize + cellSize, y * cellSize + cellSize, x * cellSize + cellSize, y * cellSize);
        }
        if (this.walls.bottom) {
            drawWall(x * cellSize + cellSize, y * cellSize + cellSize, x * cellSize, y * cellSize + cellSize);
        }
        if (this.walls.left) {
            drawWall(x * cellSize, y * cellSize, x * cellSize, y * cellSize + cellSize);
        }

    }

    highLight() {
        let x = this.i * cellSize;
        let y = this.j * cellSize;
        ctx.fillRect = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(x + 4, y + 4, cellSize - 10, cellSize - 10);
        ctx.stroke();
    }

    clearHighLight() {
        let x = this.i * cellSize;
        let y = this.j * cellSize;
        ctx.fillRect = "white";
        ctx.strokeStyle = "white";

        ctx.beginPath();
        ctx.rect(x + 4, y + 4, cellSize - 10, cellSize - 10);
        ctx.stroke();
    }

}

class Maze {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.stack = [];

    }


    setup() {
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = (new Cell(i, j));

            }
        }
        currentCell = grid[0][0];
        this.stack.push(currentCell);
        maze.width = this.rows * cellSize;
        maze.height = this.cols * cellSize;
        // this.grid[this.rows - 1][this.cols - 1
    }

    draw() {

        if (this.stack.length == 0) {
            generationComplete = true;
            this.show();
            return;
        }

        currentCell.isVisited = true;
        let nextCell = currentCell.getUnvisitedNeighbors();
        if (nextCell) {
            nextCell.isVisited = true;
            this.stack.push(currentCell);
            this.removeWalls(currentCell, nextCell);
            currentCell = nextCell;
        } else if (this.stack.length > 0) {
            currentCell = this.stack.pop();
        }
        this.draw();
    }

    show() {

        maze.style.background = "white";
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                grid[i][j].show();
            }
        }

    }

    removeWalls(a, b) {
        let i = a.i - b.i;
        /// top right bottom left
        if (i == 1) {
            a.walls.left = false;
            b.walls.right = false;
        } else if (i == -1) {
            a.walls.right = false;
            b.walls.left = false;
        }

        let y = a.j - b.j;
        if (y == 1) {
            a.walls.top = false;
            b.walls.bottom = false;
        } else if (y == -1) {
            a.walls.bottom = false;
            b.walls.top = false;
        }
    }
}

function drawWall(x, y, a, b) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(a, b);
    ctx.stroke();
}
