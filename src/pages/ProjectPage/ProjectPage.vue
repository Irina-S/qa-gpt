<template>
  <div class="projectPage d-flex ga-2 justify-space-between flex-grow-1">
    <ThreadList :threads="threads" :loading="isLoading" class="flex-shrink-0" />
    <div class="chat flex-grow-1">
      <RouterView />
    </div>
    <ProjectSidebar class="flex-shrink-0" />

    <v-snackbar
      v-model="notification.visible"
      :timeout="notification.timeout"
      :text="notification.text"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import ThreadList from './components/ThreadList/ThreadList.vue';
import ProjectSidebar from './components/ProjectSidebar/ProjectSidebar.vue';

import { useProjectsStore } from '@/store/projects';
import { useThreadsStore } from '@/store/threads';

const route = useRoute();

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);
const { setProject } = projectsStore;

const notification = ref({
  text: '',
  visible: false,
  timeout: 5000
});

const threadsStore = useThreadsStore();
const { threads, isLoading } = storeToRefs(threadsStore);
const { loadThreads } = threadsStore;

const onLoadThreads = async (projectId: string) => {
  try {
    loadThreads(projectId);
  } catch (error) {
    // @ts-ignore
    notification.value.text = error?.message ?? 'Ошибка';
    notification.value.visible = true;
  }
};

watch(
  () => route.params.projectId as string,
  (newValue) => {
    const newProject = projects.value?.find((p) => p.projectId === newValue);
    setProject(newProject);

    onLoadThreads(newValue);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.resizeHandle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
  background-color: #ccc;
}
</style>
