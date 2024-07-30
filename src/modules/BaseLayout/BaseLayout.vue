<template>
  <div class="pa-6 pr-9 h-screen d-flex ga-2">
    <ProjectsList class="flex-shrink-0" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useProjectsStore } from '@/store/projects';

import ProjectsList from './components/ProjectsList/ProjectsList.vue';

const projectsStore = useProjectsStore();
projectsStore.init();
</script>
