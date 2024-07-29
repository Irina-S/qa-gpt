<template>
  <div class="projectPage d-flex ga-2 justify-space-between">
    <ThreadNav class="flex-shrink-0" />
    <div class="chat flex-grow-2">
      <RouterView />
    </div>
    <ProjectSidebar class="flex-shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import ThreadNav from './components/ThreadNav/ThreadNav.vue';
import ProjectSidebar from './components/ProjectSidebar/ProjectSidebar.vue';
import { useProjectStore } from './store';

const route = useRoute();
const { params } = toRefs(route);

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const { setProject } = projectStore;

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
