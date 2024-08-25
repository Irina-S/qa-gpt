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
<<<<<<< aede35408dd1833778a386b9bdf9b844452c15a3
import { onMounted, ref, watch } from 'vue';
=======
import { onMounted, ref } from 'vue';
>>>>>>> 8616d4c7f71176cc138679e85c1c6ef1a9bbc5d3

import { useProjectsStore } from '@/store/projects';
import { useWebSocketStore } from '@/store/ws';
import { useUserStore } from '@/store/user';

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

const userStore = useUserStore();

const wsStore = useWebSocketStore();

const projectsStore = useProjectsStore();

onMounted(() => {
  if (userStore.isAuthorized) {
    wsStore.connect({ onError: onWsConnectError });
    window.onclose = () => wsStore.disconnect();

    projectsStore.init();
  }
});
</script>
