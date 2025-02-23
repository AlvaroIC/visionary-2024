<template>
  <div>
      <ScoreBoard :currentScore="game.getCurrentScore()" :bestScore="game.getBestScore()" />

      <div class="board">
          <div v-for="(row, rowIndex) in game.paint()" :key="rowIndex" class="row">
              <div v-for="(cell, cellIndex) in row" 
                :key="cellIndex" 
                class="cell"
                :style="{ backgroundColor: getTileColor(cell) }"
                >
                  {{ cell || '' }}
              </div>
          </div>
      </div>
  
      <div class="controls">
        <RestartButton @restart="restartGame" />
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Game2048 } from '../game2048';
import  ScoreBoard from './ScoreBoard.vue';
import RestartButton from './RestartButton.vue';

const game = ref(new Game2048(4, 4));

const colorMap = new Map<number, string>();

const getTileColor = (value: number) => {
  if (value === 0) return "#cdc1b4"; // Background color for empty tiles

  // Check if color already exists for this value
  if (!colorMap.has(value)) {
    // Generate a random color and store it
    const randomColor = `hsl(${Math.random() * 360}, 70%, 75%)`;
    colorMap.set(value, randomColor);
  }

  // Return the color for this value
  return colorMap.get(value) || "#cdc1b4"; // Default to empty tile color if somehow not found
};

// Handles the key press events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'w' || event.key === 'ArrowUp') {
      game.value.moveUp();
  } else if (event.key === 'd' || event.key === 'ArrowRight') {
      game.value.moveRight();
  } else if (event.key === 's' || event.key === 'ArrowDown') {
      game.value.moveDown();
  } else if (event.key === 'a' || event.key === 'ArrowLeft') {
      game.value.moveLeft();
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

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX > 30 ? game.value.moveRight() : game.value.moveLeft();
  } else {
      deltaY > 30 ? game.value.moveDown() : game.value.moveUp();
  }
};

const restartGame = () => {
  game.value.restart();
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
  gap: 5px;
  background: #bbada0;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
  margin: auto;
}

.row {
  display: flex;
}

.cell {
  width: 60px;
  height: 60px;
  background: #eee4da;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  margin: 3px;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
</style>