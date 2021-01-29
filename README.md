# Maze-Game
A maze is a type of puzzle games where a player moves in complex and branched passages to find a particular target or location.

# Algorithms used
- The depth-first search algorithm of maze generation is implemented using stack (iterative method) instead of recursive method.
### The DFS algorithm **(itrative method)** works as follows:
- Choose the initial cell, mark it as visited and push it to the stack
  - While the stack is not empty
    - Pop a cell from the stack and make it a current cell
    - If the current cell has any neighbours which have not been visited
    - Push the current cell to the stack
    - Choose one of the unvisited neighbours
    - Remove the wall between the current cell and the chosen cell
    - Mark the chosen cell as visited and push it to the stack

