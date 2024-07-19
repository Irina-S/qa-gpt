<template>
  <v-navigation-drawer :width="100" class="userNav" permanent>
    <v-list nav>
      <v-list-item
        v-for="project in projects"
        :key="project.projectId"
        :title="project.projectName"
        :to="`/project/${project.projectId}`"
        :ripple="false"
        prepend-icon="mdi-folder"
        class="item py-3"
      />
    </v-list>

    <v-btn
      :ripple="false"
      icon="mdi-logout"
      variant="text"
      class="exitBtn align-self-md-center mt-auto mb-4"
      @click="onLogout"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { setLoggedOut } from '@/shared/utils/auth';
import { useProjectStore } from '@/modules/ProjectPage';

const router = useRouter();

const onLogout = () => {
  setLoggedOut();
  router.push({ name: 'login' });
};

const projectStore = useProjectStore();

const { projects } = storeToRefs(projectStore);
</script>

<style lang="scss" scoped>
.userNav {
  border: none;

  &:deep() {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

.exitBtn {
  background: none !important;
  color: var(--color-text-grey) !important;

  &:hover {
    color: var(--color-text-hover-grey) !important;
  }

  &::after {
    display: none !important;
  }

  &:deep() {
    .v-btn__overlay {
      display: none;
    }

    .v-icon {
      font-size: 22px;
    }
  }
}

.item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--color-text-grey);
  background: none !important;

  &:hover {
    color: var(--color-text-hover-grey);
  }

  &::after {
    display: none !important;
  }

  &:deep() {
    .v-icon {
      opacity: 1 !important;
      font-size: 22px;
    }

    .v-list-item__overlay {
      display: none;
    }

    .v-list-item__spacer {
      display: none;
    }

    .v-list-item-title {
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 0.05em;
    }
  }

  &.v-list-item--active {
    color: var(--color-blue) !important;
  }
}
</style>
