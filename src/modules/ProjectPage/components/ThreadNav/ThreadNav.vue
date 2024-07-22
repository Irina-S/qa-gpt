<template>
  <v-navigation-drawer permanent class="threadNav" :width="320">
    <v-list nav density="compact" lines="two" class="py-0">
      <v-list-item-title class="navTitle px-4 py-4">Контексты</v-list-item-title>

      <template v-for="tr in projectThreads" :key="tr.id">
        <v-list-item
          :to="`/project/${project?.projectId}/thread/${tr.threadId}`"
          :ripple="false"
          class="item py-2"
        >
          <template v-slot:prepend>
            <v-avatar class="avatar" :size="48" color="pink-lighten-2">
              <v-icon icon="mdi-shape" :size="24" />
            </v-avatar>
          </template>

          <v-list-item-title class="title">{{ tr.threadId }}</v-list-item-title>
          <v-list-item-subtitle
            class="subtitle text-no-wrap"
            :style="{ textOverflow: 'ellipsis' }"
            >{{ tr.openAiThreadId }}</v-list-item-subtitle
          >
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useProjectStore } from '../../store';

const projectStore = useProjectStore();
const { project, thread, projectThreads } = storeToRefs(projectStore);
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
