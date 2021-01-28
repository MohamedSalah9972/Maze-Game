document.addEventListener("keydown", movements);
document.getElementById("up").addEventListener("click", up);
document.getElementById("down").addEventListener("click", down);
document.getElementById("right").addEventListener("click", right);
document.getElementById("left").addEventListener("click", left);
let player;
let mazeGame;
function play() {
    var level = document.getElementById('level').value;
    if (level == 'Easy') {
        cellSize = 22;
        rows = 8;
        cols = 8;
    } else if (level == 'Medium') {
        cellSize = 20;
        rows = 16;
        cols = 16;
    } else if (level == 'Hard') {
        cellSize = 17;
        rows = 32;
        cols = 32;
    }
    mazeGame = new Maze(rows, cols);
    mazeGame.setup();
    mazeGame.draw();
    player = grid[0][0];
    player.highLight();
    grid[rows - 1][cols - 1].destination = true;
    let x = (rows - 1) * cellSize;
    let y = (cols - 1) * cellSize;
    ctx.fillRect = "#1abc9c";
    ctx.strokeStyle = "#1abc9c";
    ctx.beginPath();
    ctx.rect(x + 4, y + 4, cellSize - 10, cellSize - 10);
    ctx.stroke();
    document.getElementById('won').innerHTML = "";

}


function movements(event) {
    if (!generationComplete || player.destination) {
        return;
    }
    // requestAnimationFrame(8)
    let key = event.key;
    
    // console.log(player);
    switch (key) {
        case "ArrowUp":
            up();
            break;
        case "ArrowDown":
            down();
            break;
        case "ArrowRight":
           right();
            break;
        case "ArrowLeft":
            left();
            break;
    }
}

function right() {
    
    if (!generationComplete || player.destination) {
        return;
    }
    let row = player.i;
    let col = player.j;
    if (!player.walls.right) {
        let element = grid[row + 1][col];
        player.clearHighLight();
        player = element;
        player.highLight();
        if (player.destination) {
            document.getElementById('won').innerHTML = "You win ^^";
        }
    }
}
function up() {
    if (!generationComplete || player.destination) {
        return;
    }
    let row = player.i;
    let col = player.j;
    if (!player.walls.top) {
        let element = grid[row][col - 1];
        player.clearHighLight();
        player = element;
        player.highLight();
        if (player.destination) {
            document.getElementById('won').innerHTML = "You win ^^";
        }
    }
}
function down() {
    if (!generationComplete || player.destination) {
        return;
    }
    let row = player.i;
    let col = player.j;
    if (!player.walls.bottom) {
        let element = grid[row][col + 1];
        player.clearHighLight();
        player = element;
        player.highLight();
        if (player.destination) {
            document.getElementById('won').innerHTML = "You win ^^";
        }
    }
}

function left() {
    if (!generationComplete || player.destination) {
        return;
    }
    let row = player.i;
    let col = player.j;
    if (!player.walls.left) {

        let element = grid[row - 1][col];
        player.clearHighLight();
        player = element;
        player.highLight();

        if (player.destination) {
            document.getElementById('won').innerHTML = "You win ^^";
        }
    }
}