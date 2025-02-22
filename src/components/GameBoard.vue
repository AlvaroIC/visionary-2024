<template>
  <div>
      <div class="scores">
          <div class="score">Score: {{ game.getCurrentScore() }}</div>
          <div class="best-score">Best: {{ game.getBestScore() }}</div>
      </div>

      <div class="board">
          <div v-for="(row, rowIndex) in game.paint()" :key="rowIndex" class="row">
              <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">
                  {{ cell || '' }}
              </div>
          </div>
      </div>
  
      <div class="controls">
          <ion-button @click="restartGame" color="danger">Restart</ion-button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonButton } from '@ionic/vue';
import { Game2048 } from '../game2048';

const game = ref(new Game2048(4, 4));

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

const handleTouchStart = (event: TouchEvent) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
};

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
.scores {
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin: 10px auto;
  font-size: 20px;
  font-weight: bold;
  background: #bbada0;
  padding: 10px;
  border-radius: 10px;
  color: white;
}

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