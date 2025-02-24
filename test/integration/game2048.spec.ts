import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Game2048 } from '../../src/game2048'; // Adjust path as needed

describe('Game2048', () => {
    let game: Game2048;

    beforeEach(() => {
        // Mock localStorage for each test
        global.localStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            clear: vi.fn(),
        } as unknown as Storage;
        game = new Game2048();
    });

    it('should initialize with a board of the correct size', () => {
        expect(game.paint().length).toBe(3); // Default height
        expect(game.paint()[0].length).toBe(3); // Default width
    });

    it('should place one initial number on the board', () => {
        let count = 0;
        game.paint().forEach(row => row.forEach(cell => {
            if (cell !== 0) count++;
        }));
        expect(count).toBe(1);
    });

    it('should restart the game', () => {
        const initialBoard = [[2, 4, 0], [0, 0, 0], [0, 0, 0]];
        game.setBoard(initialBoard);
        game.moveRight(); // Make a move to change the board
        game.restart();
        expect(game.getCurrentScore()).toBe(0);
        // Check if the board is reset (at least one number present)
        let count = 0;
        game.paint().forEach(row => row.forEach(cell => {
            if (cell !== 0) count++;
        }));
        expect(count).toBe(1);
    });

    it('should move tiles to the right and merge', () => {
        const testBoard = [[2, 2, 0], [0, 0, 0], [0, 0, 0]];
        game.setBoard(testBoard);
        game.moveRight();
        expect(game.paint()[0][2]).toStrictEqual(4);
        expect(game.getCurrentScore()).toBe(4);
    });

    it('should move tiles to the left and merge', () => {
        const testBoard = [[2, 2, 0], [0, 0, 0], [0, 0, 0]];
        game.setBoard(testBoard);
        game.moveLeft();
        expect(game.paint()[0][0]).toStrictEqual(4);
        expect(game.getCurrentScore()).toBe(4);
    });

    it('should move tiles up and merge', () => {
        const testBoard = [[2, 0, 0], [2, 0, 0], [0, 0, 0]];
        game.setBoard(testBoard);
        game.moveUp();
        expect(game.paint()[0][0]).toStrictEqual(4);
        expect(game.getCurrentScore()).toBe(4);
    });

    it('should move tiles down and merge', () => {
        const testBoard = [[2, 0, 0], [2, 0, 0], [0, 0, 0]];
        game.setBoard(testBoard);
        game.moveDown();
        expect(game.paint()[2][0]).toStrictEqual(4);
        expect(game.getCurrentScore()).toBe(4);
    });

    it('should detect a full board', () => {
        const testBoard = [[2, 4, 8], [16, 32, 64], [128, 256, 512]];
        game.setBoard(testBoard);
        expect(game.isBoardFull()).toBe(true);
    });

    it('should detect when a move is possible', () => {
        let testBoard = [[2, 4, 8], [16, 32, 64], [128, 256, 512]];
        game.setBoard(testBoard);
        expect(game.canMove()).toBe(false); // No moves possible

        testBoard = [[2, 4, 8], [16, 32, 64], [128, 256, 256]];
        game.setBoard(testBoard);
        expect(game.canMove()).toBe(true); // A move is possible
    });

    it('should update best score', () => {
        const initialBestScore = game.getBestScore();
        game.setCurrentScore(initialBestScore + 10);
        game.moveRight(); // Trigger score update (best score is saved on move)
        expect(game.getBestScore()).toBe(initialBestScore + 10);
        expect(localStorage.setItem).toHaveBeenCalledWith("bestScore", (initialBestScore + 10).toString()); // Check if localStorage.setItem was called
    });

    it('should check for win (2048 tile)', () => {
        const testBoard = [[1024, 1024, 0], [0, 0, 0], [0, 0, 0]];
        game.setBoard(testBoard);
        game.moveRight();
        expect(game.checkWin()).toBe(true);
        expect(game.getHas2048()).toBe(true); // Call the function getHas2048
    });

    it('should not detect a win after it has already happened', () => {
        const testBoard = [[1024, 1024, 0], [0, 0, 0], [0, 0, 0]];
        game.setBoard(testBoard);
        game.moveRight();
        expect(game.checkWin()).toBe(true);
        expect(game.checkWin()).toBe(false); // Check again immediately
    });

    it('should return merged tiles', () => {
        const testBoard = [[2, 2, 0], [0, 0, 0], [0, 0, 0]];
        game.setBoard(testBoard);
        game.moveRight();
        expect(game.getMergedTiles()).toStrictEqual([{ y: 0, x: 2 }]);
    });
});