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
import { ref, watch } from 'vue';

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

watch(
  () => userStore.isAuthorized,
  async () => {
    try {
      if (userStore.isAuthorized) {
        await userStore.initProfile();

        wsStore.connect({ onError: onWsConnectError });

        await projectsStore.init();
      }
    } catch (error) {
      // @ts-ignore
      notification.value.text = error.message;
      notification.value.visible = true;
    }
  },
  { immediate: true }
);
</script>
