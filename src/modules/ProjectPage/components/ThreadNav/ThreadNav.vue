<template>
  <div class="threadNav rounded-lg border pa-6 position-relative">
    <h2 class="text-h2 mb-6">Диалоги</h2>

    <v-list nav density="compact" lines="two" class="py-0 d-flex flex-column ga-2">
      <template v-for="tr in projectThreads" :key="tr.id">
        <v-list-item
          :to="`/project/${project?.projectId}/thread/${tr.threadId}`"
          :ripple="false"
          class="threadItem pa-3 ma-0"
        >
          <template v-slot:prepend>
            <v-avatar :size="36" color="var(--color-bg-grey)"> </v-avatar>
          </template>

          <v-list-item-title class="title font-weight-bold">{{
            THREAD_ID_TO_NAME[tr.threadId]
          }}</v-list-item-title>
          <v-list-item-subtitle class="subtitle text-no-wrap" :style="{ textOverflow: 'ellipsis' }"
            >...</v-list-item-subtitle
          >
        </v-list-item>
      </template>
    </v-list>

    <div class="resizeHandle" @mousedown="startResize" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { THREAD_ID_TO_NAME } from '@/shared/const';
import { useResize } from '@/composable/useResize';

import { useProjectStore } from '../../store';

const projectStore = useProjectStore();
const { project, projectThreads } = storeToRefs(projectStore);

const { computedWidth, startResize } = useResize('right', 368, 200);
</script>

<style lang="scss" scoped>
.threadNav {
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
