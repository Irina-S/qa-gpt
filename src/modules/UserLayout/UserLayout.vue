<template>
  <v-layout>
    <UserNav />

    <RouterView v-if="isProjectSelected" />
    <NoProjectText v-else />
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

import UserNav from './components/UserNav/UserNav.vue';
import NoProjectText from './components/NoProjectText/NoProjectText.vue';

const route = useRoute();

const isProjectSelected = computed(() => Boolean(route.params.projectId));
</script>
