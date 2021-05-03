const dx = [1,-1,0,0];
const dy = [0,0,-1,1];
function validPosition(i, j) {
    return i >= 0 && j >= 0 && i < rows && j < cols;
}
let parent = [], path = [];
let isVisited = [], c;

function initiate() {
    const level = document.getElementById('level').value;
    if (level == 'Easy'){
        c = 300;
    } else if (level == 'Medium'){
        c = 170;
    }else {
        c = 70;
    }
    path = [];
    isVisited = [];
    for (let i = 0; i < rows; i++) {
        isVisited[i] = [];
        parent[i] = [];
        for (let j = 0; j < cols; j++) {
            parent[i][j] = [i,j]
        }

    }
}
var go = null;
function noWall(i,j,x,y) {
    const a = grid[i][j];
    const b = grid[x][y];
    let difference = a.i - b.i;
    if (difference == 1) {
        return !a.walls.left;
    } else if (difference == -1) {
        return !a.walls.right;
    }

    difference = a.j - b.j;
    if (difference == 1) {
        return !a.walls.top;
    } else if (difference == -1) {
        return !a.walls.bottom;
    }
}
function solve() {
    clearInterval(go);
    play();
    initiate();
    // BFS
    let queue = [],i=0,j=0;
    queue.push([i, j])
    parent[i][j][0] = i;
    parent[i][j][1] = j; 
    while (queue.length > 0) {
        let currentCell = queue[0];
        i = currentCell[0];
        j = currentCell[1];
        isVisited[i][j] = true;
        // console.log(i,j);
        
        for (let k = 0; k < dx.length; k++) {
            const x = dx[k] + i;
            const y = dy[k] + j;
           
            if(validPosition(x,y) && !isVisited[x][y] && noWall(i,j,x,y)){
                queue.push([x,y]);
                parent[x][y][0] = i;
                parent[x][y][1] = j;
            }
        }
        queue.shift();
    }
    getPath(rows - 1, cols - 1);

    let currentPosition = [0,0]
    i = 1;
    go = setInterval(() => {
        // debugger;
        const element = path[i];
        if (currentPosition[0] - element[0] == 1) { // right
            left();
        } else if (currentPosition[0] - element[0] == -1) { // left
            right();
        } else if (currentPosition[1] - element[1] == 1) { // up
            up();
        }
        else { // down
            down();
        }
        currentPosition = element;
        i++;
        console.log(i);
        if (i == path.length)
            clearInterval(go);
    }, c);

    

}

function getPath(i, j) {
    if(parent[i][j][0]==i && parent[i][j][1] == j){
        path.push([i, j]);
        return;
    }
    getPath(parent[i][j][0],parent[i][j][1]);
    path.push([i,j]);
}