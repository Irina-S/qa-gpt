<template>
  <v-layout>
    <UserNav />
    <RouterView />
  </v-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import UserNav from './components/UserNav/UserNav.vue'
</script>
