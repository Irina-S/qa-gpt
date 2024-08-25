<script setup lang="ts">
import { computed, onMounted, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import BaseLayout from '@/layouts/BaseLayout/BaseLayout.vue';
import LoginLayout from '@/layouts/LoginLayout/LoginLayout.vue';
import LayoutLoader from '@/components/LayoutLoader/LayoutLoader.vue';

import keycloakController from '@/api/keycloak';

import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const { meta } = toRefs(useRoute());

const layoutComponent = computed(() => {
  if (!userStore.isAuthorized) {
    return LayoutLoader;
  }

  switch (meta.value?.layout) {
    case 'login':
      return LoginLayout;
    case 'base':
    default:
      return BaseLayout;
  }
});

onMounted(() => {
  keycloakController.initKeycloak().then((res) => {
    userStore.setIsAuthorized(res.authentificated);
  });
});
</script>

<template>
  <component :is="layoutComponent" />
</template>
