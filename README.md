# Maze-Game
A maze is a type of puzzle games where a player moves in complex and branched passages to find a particular target or location.

# Algorithms used
- The depth-first search algorithm of maze generation is implemented using stack (iterative method) instead of the recursive method to **handle recursion stack overflow**
### The DFS algorithm **(iterative method)** works as follows:
- Choose the initial cell, mark it as visited and push it to the stack
  - While the stack is not empty
    - Pop a cell from the stack and make it a current cell
    - If the current cell has any neighbours which have not been visited
      - Push the current cell to the stack
      - Choose one of the unvisited neighbours
      - Remove the wall between the current cell and the chosen cell
      - Mark the chosen cell as visited and push it to the stack
# Game Guide
- [Game link](https://mohamedsalah9972.github.io/Maze-Game/)
- Note: Play game on PC.

- ArrowUp: Move up   
- ArrowRight: Move right 
- ArrowDown: Move down 
- ArrowLeft: Move left 

- You can destroy a wall with 3 points

- W : Destroy top wall 
- D : Destroy right wall
- S : Destroy down wall
- A : Destroy left wall 
