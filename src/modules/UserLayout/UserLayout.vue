<template>
  <v-layout>
    <UserNav />
    <RouterView />
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useProjectStore } from '@/modules/ProjectPage';

import UserNav from './components/UserNav/UserNav.vue';
// import NoProjectText from './components/NoProjectText/NoProjectText.vue';

// const route = useRoute();

// const isProjectSelected = computed(() => Boolean(route.params.projectId));
const projectStore = useProjectStore();
projectStore.init();
</script>
