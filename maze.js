let cols, rows, currentCell, cellSize;
let grid = [];
let maze = document.querySelector(".maze");
let ctx = maze.getContext("2d");
let generationComplete = false;

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
        this.updateItemCounter();
    }
    updateItemCounter() {
        document.getElementById('collects').innerHTML = `
        <span class = "collectCounter"> ${numberOfCollectableItems}</span>
        `;
    }
    draw() {
        while (this.stack.length) {
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
        }
        generationComplete = true;
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

    setCollectableItems() {
        let cells = [];
        let len = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                cells.push(grid[i][j]);
                len++;
            }
        }
        const numberOfItems = Math.floor(0.20 * len); // 20% items
        for (let i = 0; i < numberOfItems; i++) {
            let randomCell = Math.floor(Math.random() * len);
            cells[randomCell].collectable = true;
            cells[randomCell] = cells[len - 1];
            len--;
        }
    }
}

function drawWall(x, y, a, b) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(a, b);
    ctx.stroke();
}