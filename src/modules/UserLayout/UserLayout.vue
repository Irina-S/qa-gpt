<template>
  <div class="pa-6 pr-9 h-screen d-flex ga-2">
    <UserNav class="flex-shrink-0" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useProjectStore } from '@/modules/ProjectPage';

import UserNav from './components/UserNav/UserNav.vue';

const projectStore = useProjectStore();
projectStore.init();
</script>
