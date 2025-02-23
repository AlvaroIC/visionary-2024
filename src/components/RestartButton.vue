<template>
    <div class="custom-button" @click="restartGame">
      Restart
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['restart']);
  
  // Handles the restart click event
  const restartGame = () => {
    emit('restart');
  };
  </script>
  
  <style scoped>
  .custom-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: 100px;
    padding: 10px;
    margin: 0 10px 15px 0;
    font-size: 20px;
    font-weight: bold;
    background: #d34a4a;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.1s;
  }
  
  .custom-button:hover {
    background: #b33b3b;
  }
  
  .custom-button:active {
    background: #9e2a2a;
  }
  </style>  