<template>
  <div class="ThreadList rounded-lg border pa-6 position-relative">
    <h2 class="text-h2 mb-6">Диалоги</h2>

    <div v-if="loading" class="d-flex flex-column ga-2">
      <v-skeleton-loader
        v-for="i in 3"
        :key="i"
        type="list-item-avatar-two-line"
        max-height="60"
        class="skeletonItem"
      ></v-skeleton-loader>
    </div>

    <v-list v-else nav density="compact" lines="two" class="pa-0 d-flex flex-column ga-2">
      <template v-for="tr in threads" :key="tr.threadId">
        <v-list-item
          :to="`/project/${project?.projectId}/thread/${tr.threadId}`"
          :ripple="false"
          class="threadItem pa-3 ma-0"
        >
          <template v-slot:prepend>
            <v-avatar :size="36" color="var(--color-bg-grey)">
              <v-icon icon="mdi-shape" :size="20" color="#9aa0a6" />
            </v-avatar>
          </template>

          <v-list-item-title class="title font-weight-bold">{{ tr.threadName }} </v-list-item-title>
          <v-list-item-subtitle
            class="subtitle text-no-wrap"
            :style="{ textOverflow: 'ellipsis' }"
            >{{ tr.threadId }}</v-list-item-subtitle
          >
        </v-list-item>
      </template>
    </v-list>

    <div class="resizeHandle" @mousedown="startResize" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useResize } from '@/composable/useResize';
import { useProjectsStore } from '@/store/projects';

import type { ThreadListProps } from './types';

defineProps<ThreadListProps>();

const projectsStore = useProjectsStore();
const { project } = storeToRefs(projectsStore);

const { computedWidth, startResize } = useResize('right', 368, 200);
</script>

<style lang="scss" scoped>
.ThreadList {
  width: v-bind(computedWidth);
}

.threadItem {
  border-radius: 12px;

  &:deep() {
    .v-list-item__overlay {
      display: none;
    }
  }

  &:hover:not(.v-list-item--active) {
    background: var(--color-tertiary) !important;
  }

  .title {
    font-size: 14px;
  }

  .subtitle {
    font-size: 12px;
    color: var(--color-text-secondary) !important;
  }

  &.v-list-item--active {
    background: var(--color-secondary) !important;
  }
}

.skeletonItem {
  height: 60px;

  &:deep() {
    .v-skeleton-loader__avatar {
      width: 36px;
      height: 36px;
      margin: 0 16px 0 0;
      min-height: unset;
      min-width: unset;
    }

    .v-skeleton-loader__text {
      height: 12px;
    }
  }
}

.resizeHandle {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  cursor: w-resize;
  background-color: transparent;
}
</style>
