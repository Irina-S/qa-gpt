<template>
  <v-layout
    ><v-main class="d-flex justify-center align-center flex-column" style="min-height: 100vh"
      ><LoginForm @login="onLogin" /></v-main
  ></v-layout>
</template>

<script setup lang="ts">
import { setLoggedIn } from '@/shared/utils/auth';

import LoginForm from './components/LoginForm/LoginForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const onLogin = () => {
  setLoggedIn();
  router.push({ name: 'main' });
};
</script>
