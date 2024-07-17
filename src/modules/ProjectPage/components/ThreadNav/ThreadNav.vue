<template>
  <v-navigation-drawer permanent class="threadNav" :width="320">
    <v-list density="compact" lines="two" class="py-0">
      <!-- <v-list-item>
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1" :size="32">
            <v-icon :size="18" color="white">mdi-view-dashboard</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-divider class="my-0" /> -->

      <v-list-item-title class="navTitle px-4 py-4">Контексты</v-list-item-title>

      <template v-for="thread in threads" :key="thread.id">
        <v-list-item
          :active="thread.id === route.params.threadId"
          :ripple="false"
          class="item py-2"
          @click="$emit('select', thread)"
        >
          <template v-slot:prepend>
            <v-avatar class="avatar" :size="48" color="pink-lighten-2">
              {{ thread.name[0] }}
            </v-avatar>
          </template>

          <v-list-item-title class="title">{{ thread.name }}</v-list-item-title>
          <v-list-item-subtitle
            class="subtitle text-no-wrap"
            :style="{ textOverflow: 'ellipsis' }"
            >{{ thread.id }}</v-list-item-subtitle
          >
        </v-list-item>
      </template>
    </v-list>

    <v-fab icon="mdi-chat-plus-outline" class="fab" @click="createModal = true" />

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

  &:deep(.v-btn) {
    background: var(--color-gradient45) !important;
    color: white;
  }
}

.threadNav {
  border-right: none !important;
  border-left: 8px solid var(--color-bg-grey);
}

.navTitle {
  font-weight: 700;
}

.item {
  border-radius: 14px !important;
  background-image: linear-gradient(360deg, #f3f3f3 0%, white 100%);

  .title {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .subtitle {
    font-size: 11px;
    color: var(--color-text-grey) !important;
  }

  &.v-list-item--active {
    background: var(--color-blue);

    .title,
    .subtitle {
      color: white !important;
    }
  }

  // &:deep() {
  //   .v-list-item__overlay {
  //     background: #f3f3f3 !important;
  //   }
  // }
}
.avatar {
  color: white;
  font-size: 24px;
}
</style>
