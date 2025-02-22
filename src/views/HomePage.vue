<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Visionary 2048</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="board">
        <div v-for="(row, rowIndex) in game.paint()" :key="rowIndex" class="row">
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">
            {{ cell || '' }}
          </div>
        </div>
      </div>

      <div class="controls">
        <ion-button @click="moveUp">⬆️</ion-button>
        <div>
          <ion-button @click="moveLeft">⬅️</ion-button>
          <ion-button @click="moveDown">⬇️</ion-button>
          <ion-button @click="moveRight">➡️</ion-button>
        </div>
        <ion-button @click="restartGame" color="danger">Restart</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { Game2048 } from '../game2048';

const game = ref(new Game2048(4, 4));

const moveUp = () => {
  game.value.moveUp();
};

const moveDown = () => {
  game.value.moveDown();
};

const moveLeft = () => {
  game.value.moveLeft();
};

const moveRight = () => {
  game.value.moveRight();
};

const restartGame = () => {
  game.value.restart();
};

onMounted(() => {});
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
