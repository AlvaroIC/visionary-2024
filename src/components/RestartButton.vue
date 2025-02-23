<template>
    <div>
      <div class="custom-button" @click="showAlert">
        Restart
      </div>
  
      <!-- Conditional rendering of IonAlert -->
      <ion-alert
        :isOpen="alertVisible"
        header="Restart Game?"
        message="Are you sure you want to restart? Your progress will be lost."
        :buttons="alertButtons"
        @didDismiss="handleAlertDismiss"
      ></ion-alert>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonAlert } from '@ionic/vue';
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['restart']);
  
  // Local state to manage the alert's visibility
  const alertVisible = ref(false);
  
  // Alert buttons with actions
  const alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
        alertVisible.value = false;  // Hide the alert if canceled
      },
    },
    {
      text: 'Restart',
      role: 'confirm',
      handler: () => {
        emit('restart');
        alertVisible.value = false;  // Hide the alert after confirming restart
      },
    },
  ];
  
  // Show the alert by setting alertVisible to true
  const showAlert = () => {
    alertVisible.value = true;
  };
  
  // Handle the alert's dismissal
  const handleAlertDismiss = () => {
    console.log('Alert dismissed');
    alertVisible.value = false;
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