<template>
  <ContextNav />
  <ProjectSidebar />

  <v-main class="d-flex align-stretch flex-column" style="min-height: 100vh">
    <RouterView />
  </v-main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import ContextNav from './components/ContextNav/ContextNav.vue'
import ProjectSidebar from './components/ProjectSidebar/ProjectSidebar.vue'
</script>
