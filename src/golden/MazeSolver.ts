// === Maze Solver ===
//
// Uses DFS / backtracking to find a path from start to end through a 2D maze.
// The maze is an array of strings: 'x' is wall, ' ' (space) is open.
//
// Steps:
// 1. Mark current cell as visited (add to path, optionally modify maze).
// 2. If current == end, return true (solution found).
// 3. Try each direction (up, right, down, left):
//    a. Skip if out of bounds, is a wall, or already in path.
//    b. Recurse; if true, unwind with success.
// 4. If no direction works, remove current from path and return false.

const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    const { y, x } = curr;
    if (y < 0 || y >= maze.length || x < 0 || x >= maze[y].length) return false;
    if (maze[y][x] === wall) return false;
    if (seen[y][x]) return false;
    if (y === end.y && x === end.x) {
        path.push(curr);
        return true;
    }

    seen[y][x] = true;
    path.push(curr);

    for (const [dy, dx] of dir) {
        if (walk(maze, wall, { y: y + dy, x: x + dx }, end, seen, path)) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[i].length).fill(false));
    }
    const path: Point[] = [];
    walk(maze, wall, start, end, seen, path);
    return path;
}
