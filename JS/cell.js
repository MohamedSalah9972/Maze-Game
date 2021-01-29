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
        this.collectable = false;
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
        if (this.collectable) {
            x = x * cellSize + cellSize / 2;
            y = y * cellSize + cellSize / 2;
            ctx.beginPath();
            ctx.arc(x, y, cellSize / 7, 0, 2 * Math.PI);
            ctx.fillStyle = 'green';
            ctx.fillRect = "green"
            ctx.fill();
            ctx.strokeStyle = "green";
            ctx.stroke();
        }

    }

    highLight() {
        let x = this.i * cellSize;
        let y = this.j * cellSize;
        ctx.fillRect = "black";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(x + 4, y + 4, cellSize - 10, cellSize - 10);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();
    }

    clearHighLight() {
        let x = this.i * cellSize;
        let y = this.j * cellSize;
        ctx.fillRect = "white";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.rect(x + 4, y + 4, cellSize - 10, cellSize - 10);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
    }

    destroyWall(wallNumber){
        if (numberOfCollectableItems < 3) {
            return;
        }
        
        // top right bottom left
        let x = (this.i);
        let y = (this.j);
        ctx.strokeStyle = "white";
        ctx.fillRect = "white"
        ctx.lineWidth = 2;
        if (wallNumber == 1 && this.walls.top) {
            this.walls.top = false;
            numberOfCollectableItems -= 3;
            if (grid[x][y - 1]) {
                grid[x][y - 1].walls.bottom = false;
            }
            drawWall(x * cellSize, y * cellSize, x * cellSize + cellSize, y * cellSize);

        }
        else if (wallNumber == 2 && this.walls.right) {
            this.walls.right = false;
            numberOfCollectableItems -= 3;
            if (grid[x + 1][y]) {
                grid[x + 1][y].walls.left = false;
            }
            drawWall(x * cellSize + cellSize, y * cellSize + cellSize, x * cellSize + cellSize, y * cellSize);
        }
        else if (wallNumber == 3 && this.walls.bottom) {
            this.walls.bottom = false;
            numberOfCollectableItems -= 3;
            if (grid[x][y + 1]) {
                grid[x][y + 1].walls.top = false;
            }
            drawWall(x * cellSize + cellSize, y * cellSize + cellSize, x * cellSize, y * cellSize + cellSize);
        }
        else if (wallNumber == 4 && this.walls.left) {
            this.walls.left = false;
            numberOfCollectableItems -= 3;
            if (grid[x - 1][y]) {
                grid[x - 1][y].walls.right = false;
            }
            drawWall(x * cellSize, y * cellSize, x * cellSize, y * cellSize + cellSize);
        }
        

    }
}