<template>
    <div>
      <div class="custom-button" @click="showAlert">
        {{ $t('restart') }}
      </div>
  
      <ion-alert
        :isOpen="alertVisible"
        :header="$t('restart-question')"
        :message="$t('restart-question-explanation')"
        :buttons="alertButtons"
        @didDismiss="handleAlertDismiss"
      ></ion-alert>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IonAlert } from '@ionic/vue';
  import { defineEmits } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  // Get the translation function
  const { t } = useI18n();
  // Emits the order to restart
  const emit = defineEmits(['restart']);
  const alertVisible = ref(false);
  
  const alertButtons = [
    {
      text: t('restart-question-cancel'),
      role: 'cancel',
      handler: () => {
        alertVisible.value = false;
      },
    },
    {
      text: t('restart-question-restart'),
      role: 'confirm',
      handler: () => {
        emit('restart');
        alertVisible.value = false;
      },
    },
  ];
  
  const showAlert = () => {
    alertVisible.value = true;
  };
  
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
    min-width: 1em;
    padding: 0.5em;
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