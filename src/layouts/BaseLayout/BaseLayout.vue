<template>
  <div class="pa-6 pr-9 h-screen d-flex ga-2">
    <ProjectsList class="flex-shrink-0" />
    <RouterView />

    <v-snackbar
      v-model="notification.visible"
      :timeout="notification.timeout"
      :text="notification.text"
    />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref } from 'vue';

import { useProjectsStore } from '@/store/projects';
import { useWebSocketStore } from '@/store/ws';

import ProjectsList from './components/ProjectsList/ProjectsList.vue';

// @@TODO: вынести везде нотификации в стор
const notification = ref({
  text: '',
  visible: false,
  timeout: 5000
});

const onWsConnectError = (message: string) => {
  notification.value.text = message;
  notification.value.visible = true;
};

const wsStore = useWebSocketStore();
wsStore.connect({ onError: onWsConnectError });
window.onclose = () => wsStore.disconnect();

const projectsStore = useProjectsStore();
projectsStore.init();
</script>
