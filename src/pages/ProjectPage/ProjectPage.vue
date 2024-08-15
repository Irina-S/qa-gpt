<template>
  <div class="projectPage d-flex ga-2 justify-space-between flex-grow-1">
    <ThreadList class="flex-shrink-0" />
    <div class="chat flex-grow-1">
      <RouterView />
    </div>
    <ProjectSidebar class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import ThreadList from './components/ThreadList/ThreadList.vue';
import ProjectSidebar from './components/ProjectSidebar/ProjectSidebar.vue';

import { useProjectsStore } from '@/store/projects';

const route = useRoute();
const { params } = toRefs(route);

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);
const { setProject } = projectsStore;

watch(
  () => params.value.projectId,
  (newValue) => {
    const newProject = projects.value?.find((p) => p.projectId === newValue);
    setProject(newProject);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.projectPage {
  // max-width: calc(100% - 8px - 180px);
}

.chat {
  // max-width: calc(100% - 368px - 368px);
}

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
