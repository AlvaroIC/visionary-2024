export class Game2048 {
    private board: number[][];
    private height: number;
    private width: number;
    private currentScore: number;
    private bestScore: number;
    private mergedTiles: { y: number, x: number }[];
  
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
  
    // Sets a  new 2 in a random empty position of the board and updates its state
    public next(): void {
        this.newNumber();
        this.paint();
    }
  
    // Checks if the board is full
    public isBoardFull(): boolean {
        return this.board.every(row => row.every(cell => cell !== 0));
    }
  
    // Moves the numbers to the right and places the next 2
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
                    this.mergedTiles.push({ y: y, x: i + (this.width - row.length -1) });
                    console.log(this.mergedTiles);
                }
            }
        
            // Fill the remaining spaces with 0s
            while (row.length < this.width) {
                row.unshift(0); // Add 0s at the beginning to shift the row to the right
            }
        
            // Update the row in the board
            this.board[y] = row;
        }

        // Check if currentScore exceeds bestScore
        if (this.currentScore > this.bestScore) {
            this.bestScore = this.currentScore;
            this.saveBestScore(); // Save new best score
        }
        
        this.next();
    }
  
    // Moves the numbers to the left and places the next 2
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
        
        // Rotate merged tiles
        for (const tile of this.mergedTiles) {
            newMergedTiles.push({y: tile.x, x: this.height - 1 - tile.y});
        }
        this.mergedTiles = newMergedTiles;

        this.board = newBoard;
        [this.height, this.width] = [this.width, this.height];
    }
  
    // Moves the numbers up and places the next 2
    public moveUp(): void {
        this.rotateBoard();
        this.moveRight();
        this.rotateBoard();
        this.rotateBoard();
        this.rotateBoard();
    }
    
    // Moves the numbers down and places the next 2
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
}  