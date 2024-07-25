<template>
  <div class="nav rounded-lg border py-9" permanent absolute>
    <div class="d-flex flex-column align-center mb-9">
      <v-avatar :size="48" color="#20202014" class="mb-2" />
      <div class="userName font-weight-bold">Админ</div>
      <div class="userEmail">admin@egar.ru</div>
    </div>

    <v-list nav class="pa-0">
      <v-list-item
        v-for="project in projects"
        :key="project.projectId"
        :to="`/project/${project.projectId}`"
        :ripple="false"
        class="navItem rounded-xl"
      >
        <div class="projectImgContainer">
          <v-avatar image="/bcs.png" :size="32" color="#20202014" class="rounded"></v-avatar>
        </div>

        <v-list-item-title class="font-weight-bold projectTitle">{{
          project.projectName
        }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-icon icon="mdi-logout" :size="16" class="exitBtn iconBtn" @click="onLogout" />
  </div>
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
.nav {
  position: relative;
  width: 180px;

  &:deep() {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 36px 24px;
    }
  }
}

.navItem {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none !important;

  &:deep() {
    .v-list-item__overlay {
      display: none !important;
    }

    .v-list-item__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  }

  &.v-list-item--active,
  &:hover {
    .projectImgContainer {
      border: 2px solid var(--color-primary);
    }
  }

  &.v-list-item--active {
    .projectTitle {
      color: var(--color-primary);
    }
  }
}

.exitBtn {
  position: absolute;
  top: 16px;
  right: 16px;
}

.projectImgContainer {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.userName {
  font-size: 14px;
}

.userEmail {
  font-size: 8px;
  color: var(--color-text-secondary);
}
</style>
