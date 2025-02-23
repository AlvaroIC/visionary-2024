<template>
    <div>
      <div class="custom-button" @click="showPrompt">
        {{ $t('resize') }}
      </div>
  
      <ion-alert
        :isOpen="alertVisible"
        :header="$t('resize-question')"
        :message="$t('resize-question-explanation')"
        :inputs="alertInputs"
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
  
  const { t } = useI18n();
  const emit = defineEmits(['resize']);
  const alertVisible = ref(false);
  const gridSize = ref(3); // Default grid size
  
  const alertInputs = [
    {
      name: 'size',
      type: 'number',
      min: 3,
      max: 6,
      value: gridSize.value,
    },
  ];
  
  const alertButtons = [
    {
      text: t('resize-question-cancel'),
      role: 'cancel',
      handler: () => {
        alertVisible.value = false;
      },
    },
    {
      text: t('resize-question-resize'),
      role: 'confirm',
      handler: (data: { size: string; }) => {
        const newSize = parseInt(data.size);
        if (newSize >= 3 && newSize <= 6) {
          gridSize.value = newSize;
          emit('resize', newSize);
        }
        alertVisible.value = false;
      },
    },
  ];
  
  const showPrompt = () => {
    alertVisible.value = true;
  };
  
  const handleAlertDismiss = () => {
    alertVisible.value = false;
  };
  </script>
  
  <style scoped>
  .custom-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: 9em;
    padding: 0.5em;
    font-size: 20px;
    font-weight: bold;
    background: #4a80d3;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.1s;
  }
  
  .custom-button:hover {
    background: #3b6bb3;
  }
  
  .custom-button:active {
    background: #2a559e;
  }
  </style>