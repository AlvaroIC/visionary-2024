<template>
  <div>
    <ScoreBoard :currentScore="game.getCurrentScore()" :bestScore="game.getBestScore()" />

    <div class="board">
      <div v-for="(row, rowIndex) in game.paint()" :key="rowIndex" class="row">
        <div v-for="(cell, cellIndex) in row" 
             :key="cellIndex" 
             :class="{ 'cell': true, 'merged': isMerged(rowIndex, cellIndex) }"
             :style="{ backgroundColor: getTileColor(cell) }"
             >
          {{ cell || '' }}
        </div>
      </div>
    </div>

    <div class="controls">
      <RestartButton @restart="restartGame" />
      <ResizeButton @resize="resizeGame" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Game2048 } from '../game2048';
import  ScoreBoard from './ScoreBoard.vue';
import RestartButton from './RestartButton.vue';
import ResizeButton from './ResizeButton.vue';
import { alertController } from '@ionic/vue';

const game = ref(new Game2048(3, 3));
const mergedTiles = ref<{ y: number, x: number }[]>([]);
const alertOpen = ref(false);

const colorMap = new Map<number, string>();

// Returns a new color for tiles with a certain multiple of 2
const getTileColor = (value: number) => {
  if (value === 0) return "#cdc1b4"; // Background color for empty tiles

  // Check if a color already exists for this value
  if (!colorMap.has(value)) {
    // Generate a random color and store it
    const randomColor = `hsl(${Math.random() * 360}, 70%, 75%)`;
    colorMap.set(value, randomColor);
  }

  // Returns the color for this value
  return colorMap.get(value) || "#cdc1b4"; // Default to empty tile color if it was not found
};

// Handles the key press events
const handleKeydown = async (event: KeyboardEvent) => {
    let moved = false;
  if (event.key === 'w' || event.key === 'ArrowUp') {
    game.value.moveUp();
    moved = true;
  } else if (event.key === 'd' || event.key === 'ArrowRight') {
    game.value.moveRight();
      moved = true;
  } else if (event.key === 's' || event.key === 'ArrowDown') {
    game.value.moveDown();
      moved = true;
  } else if (event.key === 'a' || event.key === 'ArrowLeft') {
    game.value.moveLeft();
      moved = true;
  }

    if (moved) {
        mergedTiles.value = game.value.getMergedTiles();
        setTimeout(() => {
            mergedTiles.value = [];
        }, 200); // Clear merged tiles after animation
    }

    if (!game.value.canMove() && alertOpen.value === false) {
      await presentGameOverAlert(); // Show alert if no further move is possible
    }
};

let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;

// Checks when the touch event starts
const handleTouchStart = (event: TouchEvent) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
};

// Checks when the touch event ends and updates the tiles accordingly
const handleTouchEnd = (event: TouchEvent) => {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

    let moved = false;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 30) {
          deltaX > 0 ? game.value.moveRight() : game.value.moveLeft();
          moved = true;
      }
  } else {
      if (Math.abs(deltaY) > 30) {
          deltaY > 0 ? game.value.moveDown() : game.value.moveUp();
          moved = true;
    }
  }
    if (moved) {
        mergedTiles.value = game.value.getMergedTiles();
        setTimeout(() => {
            mergedTiles.value = [];
        }, 200); // Clear merged tiles after animation duration
    }
};

const restartGame = () => {
  game.value.restart();
    mergedTiles.value = []; // Reset merged tiles on restart
};

const initializeGame = (size: number) => {
  game.value = new Game2048(size, size);
  colorMap.clear(); // Clear the color map
};

const resizeGame = (newSize: number) => {
  initializeGame(newSize); // Starts a new game with the new size
};

// Computed property to check if a cell is merged
const isMerged = (rowIndex: number, cellIndex: number): boolean => {
  return mergedTiles.value.some(tile => tile.y === rowIndex && tile.x === cellIndex);
};

const presentGameOverAlert = async () => {
  alertOpen.value = true;
  const alert = await alertController.create({
    header: 'Game Over',
    message: 'No more moves left!',
    buttons: [
    {
      text: 'OK',
      handler: () => {
        restartGame(); // The game is restarted after the user presses the "OK" button
        alertOpen.value = false;
      }
    }
  ]
  });

  await alert.present();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchend', handleTouchEnd);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchend', handleTouchEnd);
});
</script>

<style scoped>
.board {
  display: grid;
  gap: 0.5em;
  background: #bbada0;
  padding: 0.5em;
  border-radius: 10px;
  width: fit-content;
  margin: auto;
}

.row {
  display: flex;
}

.cell {
  width: 3em;
  height: 3em;
  background: #eee4da;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  font-weight: bold;
  border-radius: 5px;
  margin: 0.25em;
  transition: transform 0.2s ease;
}

.cell.merged {
    transform: scale(1.2);
    z-index: 1;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  margin-top: 1em;
}
</style>