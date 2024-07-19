<template>
  <ThreadNav />
  <ProjectSidebar />

  <v-main class="d-flex align-stretch flex-column" style="min-height: 100vh">
    <RouterView />
  </v-main>
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
const { projectId } = toRefs(params.value);

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const { setProject } = projectStore;

watch(
  () => projectId.value,
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
