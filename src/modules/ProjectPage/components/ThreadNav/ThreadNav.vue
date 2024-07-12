<template>
  <v-navigation-drawer permanent>
    <v-list density="compact" lines="two">
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1" :size="32">
            <v-icon :size="18" color="white">mdi-view-dashboard</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-divider class="my-0" />

      <template v-for="thread in threads" :key="thread.id">
        <v-list-item :active="thread.id === route.params.threadId" @click="$emit('select', thread)">
          <template v-slot:prepend>
            <v-avatar color="grey-lighten-1" :size="32">
              <v-icon :size="18" color="white">mdi-message</v-icon>
            </v-avatar>
          </template>

          <v-list-item-title>{{ thread.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-no-wrap" :style="{ textOverflow: 'ellipsis' }">{{
            thread.id
          }}</v-list-item-subtitle>
        </v-list-item>
        <v-divider class="my-0" />
      </template>
    </v-list>

    <v-fab
      icon="mdi-chat-plus-outline"
      color="light-blue-darken-1"
      class="fab"
      @click="createModal = true"
    />

    <create-thread-modal v-model="createModal" @create="$emit('create', $event)" />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import type { ThreadNavProps, ThreadNavEmits } from './types';
import { defineAsyncComponent } from 'vue';

const CreateThreadModal = defineAsyncComponent(
  () => import('./../CreateThreadModal/CreateThreadModal.vue')
);

const props = withDefaults(defineProps<ThreadNavProps>(), {
  // @ts-ignore
  threads: []
});
const emits = defineEmits<ThreadNavEmits>();

const route = useRoute();
const { params } = route;
const { projectId } = params;

const createModal = ref(false);
</script>

<style lang="scss" scoped>
.fab {
  top: 0;
  left: 100%;
  position: absolute;

  &:deep(.v-fab__container) {
    position: absolute;
    bottom: 20px;
    right: 28px;
  }
}
</style>
