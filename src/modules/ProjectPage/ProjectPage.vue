<template>
  <ThreadNav />
  <ProjectSidebar />

  <v-main class="d-flex align-stretch flex-column" style="min-height: 100vh">
    <RouterView v-if="isThreadSelected" />
    <NoThreadText v-else />
  </v-main>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

import ThreadNav from './components/ThreadNav/ThreadNav.vue';
import ProjectSidebar from './components/ProjectSidebar/ProjectSidebar.vue';
import NoThreadText from './components/NoThreadText/NoThreadText.vue';

const route = useRoute();

const isThreadSelected = computed(() => Boolean(route.params.threadId));
</script>
