export class Game2048 {
    private board: number[][];
    private height: number;
    private width: number;
    private currentScore: number;
    private bestScore: number;
    private mergedTiles: { y: number, x: number }[];
    private has2048: boolean = false;
  
    // By default, the dimensions of the board are 3x3
    constructor(height: number = 3, width: number = 3) {
        this.height = height;
        this.width = width;
        this.currentScore = 0;
        // Gets the current best score
        this.bestScore = this.loadBestScore();
        this.board = Array.from({ length: height }, () => Array(width).fill(0));
        this.mergedTiles = [];
        // The game starts after the first 2 is placed on the board
        this.next();
    }
  
    // Restarts the board, sets the current score to 0 and places the first 2
    public restart(): void {
        this.board = Array.from({ length: this.height }, () => Array(this.width).fill(0));
        this.currentScore = 0;
        this.next();
    }
  
    // Sets a new 2 in a random empty position of the board
    private newNumber(): void {
        const currentEmptyPositions: { x: number, y: number }[] = [];
      
        // Obtain all current empty positions
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.board[y][x] === 0) {
                    currentEmptyPositions.push({ x, y });
                }
            }
        }
  
        // If there are still empty positions availiable, set the new 2 in a random position
        if (currentEmptyPositions.length > 0) {
            const randomPosition = currentEmptyPositions[Math.floor(Math.random() * currentEmptyPositions.length)];
            this.board[randomPosition.y][randomPosition.x] = 2;
        }
    }
  
    // Returns the board in its current state
    public paint(): number[][] {
        return this.board
    }
  
    // Sets a new 2 in a random empty position of the board and updates its state
    private next(): void {
        this.newNumber();
        this.paint();
    }
  
    // Checks if the board is full
    public isBoardFull(): boolean {
        return this.board.every(row => row.every(cell => cell !== 0));
    }

    // Checks if a new move is possible
    public canMove(): boolean {
        if (!this.isBoardFull()) {
            return true; // If the board isn't full, a move is always possible
        }

        // Check for adjacent equal tiles (only if the board is full)
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const currentValue = this.board[y][x];

                // Check right
                if (x < this.width - 1 && this.board[y][x + 1] === currentValue) {
                    return true;
                }

                // Check down
                if (y < this.height - 1 && this.board[y + 1][x] === currentValue) {
                    return true;
                }
            }
        }

        return false; // Board is full and no adjacent equal tiles, so no move possible
    }
  
    public moveRight(): void {
        // Resets the merged tiles array
        this.mergedTiles = [];

        for (let y = 0; y < this.height; y++) {
            // Filter out all zeros (empty cells)
            const row = this.board[y].filter(val => val !== 0);
            
            // Merge tiles if two consecutive tiles have the same number
            for (let i = row.length - 1; i > 0; i--) {
                if (row[i] === row[i - 1]) {
                    // Updates the current score
                    this.currentScore += row[i] * 2;
                    row[i] *= 2;
                    row.splice(i - 1, 1); // Remove the merged tile
                    this.mergedTiles.push({ y: y, x: i + (this.width - row.length -1) }); // Adds the merged tile to the merged tiles array
                }
            }
        
            // Fill the remaining spaces with 0s
            while (row.length < this.width) {
                row.unshift(0); // Add 0s at the beginning to shift the row to the right
            }
        
            // Update the row in the board
            this.board[y] = row;
        }

        // Check if the current score exceeds the best score
        if (this.currentScore > this.bestScore) {
            this.bestScore = this.currentScore;
            this.saveBestScore(); // Save the new best score
        }
        
        this.next();
    }
  
    public moveLeft(): void {
        this.rotateBoard();
        this.rotateBoard();
        this.moveRight();
        this.rotateBoard();
        this.rotateBoard();
    }
  
    private rotateBoard(): void {
        const newBoard: number[][] = [];
        const newMergedTiles: {y: number, x: number}[] = [];

        for (let x = 0; x < this.width; x++) {
            const newRow: number[] = [];
            for (let y = this.height - 1; y >= 0; y--) {
                newRow.push(this.board[y][x]);
            }
            newBoard.push(newRow);
        }
        
        // Rotate merged tiles as well
        for (const tile of this.mergedTiles) {
            newMergedTiles.push({y: tile.x, x: this.height - 1 - tile.y});
        }
        this.mergedTiles = newMergedTiles;

        this.board = newBoard;
        [this.height, this.width] = [this.width, this.height];
    }
  
    public moveUp(): void {
        this.rotateBoard();
        this.moveRight();
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
    }
    
    public moveDown(): void {
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
        this.moveRight();
        this.rotateBoard();
    }

    public getCurrentScore(): number {
        return this.currentScore;
    }

    private saveBestScore(): void {
        localStorage.setItem("bestScore", this.bestScore.toString());
    }

    private loadBestScore(): number {
        return parseInt(localStorage.getItem("bestScore") || "0", 10);
    }

    public getBestScore(): number {
        return this.bestScore;
    }

    public getMergedTiles(): { y: number; x: number; }[] {
        return this.mergedTiles
    }

    public checkWin(): boolean {
        if (!this.has2048) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (this.board[y][x] === 2048) {
                        this.has2048 = true;
                        return true; // Return true only the first time 2048 is found
                    }
                }
            }
        }
        return false; // Return false if 2048 has already been found or not found this turn
    }

    // Public method to set the board (for testing purposes)
    public setBoard(board: number[][]): void {
        this.board = board;
    }

    // Public method to set the current score (for testing purposes)
    public setCurrentScore(score: number): void {
        this.currentScore = score;
    }

    // Public method to get the value of has2048 (for testing purposes)
    public getHas2048(): boolean {
        return this.has2048;
    }
}  