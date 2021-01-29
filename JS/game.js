document.addEventListener("keydown", movements);
document.getElementById("up").addEventListener("click", up);
document.getElementById("down").addEventListener("click", down);
document.getElementById("right").addEventListener("click", right);
document.getElementById("left").addEventListener("click", left);
let player = null;
let mazeGame = null;
let gameStarted = false;
var timer = null;
let TIME_LIMIT;
let numberOfCollectableItems=0;
function play() {
    gameStarted = false;
    gameStarted = false;
    const level = document.getElementById('level').value;
    if (level == 'Easy') {
        TIME_LIMIT = 25;
        cellSize = 22;
        rows = 8;
        cols = 8;
    } else if (level == 'Medium') {
        TIME_LIMIT = 40;
        cellSize = 20;
        rows = 16;
        cols = 16;
    } else if (level == 'Hard') {
        TIME_LIMIT = 120;
        cellSize = 17;
        rows = 32;
        cols = 32;
    }
    mazeGame = new Maze(rows, cols);
    prepareGame(mazeGame);
    
}
function prepareGame(mazeGame) {
    mazeGame.setup();
    mazeGame.draw();
    mazeGame.setCollectableItems();
    mazeGame.show();
    numberOfCollectableItems = 0;
    mazeGame.updateItemCounter();
    player = setPlayer();
    document.getElementById('result').innerHTML = "";
    if (timer === null) {
        timer = new Timer(TIME_LIMIT);
    }
    timerStarted = false;
    gameStarted = true;
    player = setPlayer();
    timer.reset(TIME_LIMIT);
    timer.init();
}

function setPlayer() {
    var player = grid[0][0];
    player.collectable = false;
    player.highLight();
    grid[rows - 1][cols - 1].destination = true;
    var x = (rows - 1) * cellSize;
    let y = (cols - 1) * cellSize;
    ctx.beginPath();
    ctx.rect(x + 4, y + 4, cellSize - 10, cellSize - 10);
    ctx.fillRect = "#1abc9c";
    ctx.strokeStyle = "#1abc9c";
    ctx.fillStyle = "#1abc9c";
    ctx.fill();
    ctx.stroke();
    return player;
}

function movements(event) {
    if (!generationComplete || player.destination || timer.timeLeft==0) {
        return;
    }
    
    if(!timerStarted && gameStarted)
    {
            timer.startTimer();
            timerStarted = true;
    }
    let code = event.code;
    switch(code){
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
        case "KeyW":
            player.destroyWall(1);
            mazeGame.updateItemCounter();
            break;
        case "KeyD":
            player.destroyWall(2);
            mazeGame.updateItemCounter();
            break;
        case "KeyS": 
            player.destroyWall(3);
            mazeGame.updateItemCounter();
            break;
        case "KeyA":
            player.destroyWall(4);
            mazeGame.updateItemCounter();
            break;

            
    }
}
function update(next) {
    numberOfCollectableItems += next.collectable;
    next.collectable = false;
    player.clearHighLight();
    player = next;
    mazeGame.updateItemCounter();
    player.highLight();
    if (player.destination) {
        gameStarted = false;
        timer.onTimesUp();
        document.getElementById('result').innerHTML = "You win ^^";
    }
}
function right() {
    
    if (!generationComplete || player.destination) {
        return;
    }

    if (!timerStarted && gameStarted) {
        timerStarted = true;
        timer.startTimer();
    }

    let row = player.i;
    let col = player.j;
    if (!player.walls.right) {
        let element = grid[row + 1][col];
        update(element);
    }
}
function up() {
    if (!generationComplete || player.destination) {
        return;
    }

    if (!timerStarted && gameStarted) {
        timer.startTimer();
        timerStarted = true;
    }

    let row = player.i;
    let col = player.j;
    if (!player.walls.top) {
        let element = grid[row][col - 1];
        update(element);
    }
}
function down() {
    if (!generationComplete || player.destination) {
        return;
    }

    if (!timerStarted && gameStarted) {
        timer.startTimer();
        timerStarted = true;
    }

    let row = player.i;
    let col = player.j;
    if (!player.walls.bottom) {
        let element = grid[row][col + 1];
        update(element);
    }
}

function left() {
    if (!generationComplete || player.destination) {
        return;
    }

    if (!timerStarted && gameStarted) {
        timer.startTimer();
        timerStarted = true;
    }

    let row = player.i;
    let col = player.j;
    if (!player.walls.left) {
        let element = grid[row - 1][col];
        update(element);
    }
}