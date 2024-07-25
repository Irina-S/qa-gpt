<template>
  <div class="projectPage d-flex ga-2">
    <ThreadNav class="flex-shrink-0" />
    <div class="chat">
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
// const { projectId } = toRefs(params);

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

// const router = useRouter();

// const onSelectThread = (thread: ThreadItem) => {
//   updateThread(thread);
//   router.push(`/project/${route.params.projectId}/thread/${thread.id}`);
// };
</script>

<style scoped lang="scss">
.projectPage {
  max-width: calc(100% - 8px - 180px);
}

.chat {
  max-width: calc(100% - 368px - 368px);
}
</style>
