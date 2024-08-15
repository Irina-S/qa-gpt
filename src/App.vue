<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout/BaseLayout.vue';
import LoginLayout from '@/layouts/LoginLayout/LoginLayout.vue';

const { meta } = toRefs(useRoute());

const layoutComponent = computed(() => {
  switch (meta.value?.layout) {
    case 'login':
      return LoginLayout;
    case 'base':
    default:
      return BaseLayout;
  }
});
</script>

<template>
  <component :is="layoutComponent" />
</template>
