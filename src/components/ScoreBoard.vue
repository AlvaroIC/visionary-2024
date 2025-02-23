<template>
  <div class="scores">
    <div class="score">
      {{ $t('score') }}: {{ props.currentScore }}
    </div>
    <div class="score">
      {{ $t('best') }}:&nbsp;<span :class="{ 'highlight': bestScoreChanged }"> {{ props.bestScore }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

// Current and best scores
const props = defineProps<{
  currentScore: number;
  bestScore: number;
}>();

const bestScoreChanged = ref(false);

watch(
  () => props.bestScore,
  (newValue, oldValue) => {
    if (oldValue !== undefined) { // Prevent highlight on initial render
      bestScoreChanged.value = true;
      setTimeout(() => {
        bestScoreChanged.value = false;
      }, 300);
    }
  }
);
</script>

<style scoped>
.scores {
  display: flex;
  width: 100%;
  gap: 1em;
}

.score {
  display: flex;
  justify-content: space-between;
  width: auto;
  min-width: 1em;
  padding: 0.5em;
  margin: 0 0 1em 0;
  font-size: 1.25em;
  font-weight: bold;
  background: #bbada0;
  border-radius: 10px;
  color: white;
  white-space: nowrap;
  transition: transform 0.3s ease, color 0.3s ease; /* Smooth transitions */
}

.highlight {
  color: yellow; /* Highlight color */
  transform: scale(1.1); /* Slightly bigger */
}
</style>