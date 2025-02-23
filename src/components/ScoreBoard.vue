<template>
    <div class="scores">
        <div class="score">{{ $t('score') }}: {{ props.currentScore }}</div>
        <div class="score">{{ $t('best') }}: {{ props.bestScore }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  // Current and best game scores
  const props = defineProps<{
    currentScore: number;
    bestScore: number;
  }>();
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
  }
  </style>  