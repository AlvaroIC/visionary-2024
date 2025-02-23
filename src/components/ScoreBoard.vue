<template>
    <div class="scores">
        <div class="score">Score: {{ props.currentScore }}</div>
        <div class="score">Best: {{ props.bestScore }}</div>
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
    gap: 5px;
  }
  
  .score {
    display: flex;
    justify-content: space-between;
    width: auto;
    min-width: 100px;
    padding: 10px;
    margin: 0 10px 15px 0;
    font-size: 20px;
    font-weight: bold;
    background: #bbada0;
    border-radius: 10px;
    color: white;
    white-space: nowrap;
  }
  </style>  