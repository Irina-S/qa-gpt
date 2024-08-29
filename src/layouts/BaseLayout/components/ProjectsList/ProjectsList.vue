<template>
  <div class="nav rounded-lg border py-9">
    <div class="d-flex flex-column align-center mb-9">
      <v-avatar :size="48" color="#20202014" class="mb-2">
        <v-icon icon="mdi-account" :size="36" color="#9aa0a6" />
      </v-avatar>
      <div class="userName font-weight-bold">{{ profile.login }}</div>
      <div class="userEmail">user@egar.ru</div>

      <div class="d-flex flex-column align-center">
        <v-switch
          v-if="profile.isAdmin"
          v-model="isAdminMode"
          color="primary"
          density="compact"
          hide-details
          class="adminSwitch"
        />
        <div class="adminSwitchLabel">Все проекты</div>
      </div>
    </div>

    <v-list v-if="isLoading" nav class="pa-0 d-flex flex-column align-center ga-4">
      <v-skeleton-loader v-for="i in 3" :key="i" type="list-item-avatar" class="projectLoader" />
    </v-list>
    <v-list v-else nav class="pa-0">
      <v-list-item
        v-for="project in projects"
        :key="project.projectId"
        :to="`/project/${project.projectId}`"
        :ripple="false"
        class="navItem rounded-xl"
      >
        <div class="projectImgContainer">
          <v-avatar image="/bcs.png" :size="32" color="#20202014" class="rounded" />
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
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useProjectsStore } from '@/store/projects';
import { useUserStore } from '@/store/user';

import keyclockController from '@/api/keycloak';

const projectsStore = useProjectsStore();
const { projects, isLoading } = storeToRefs(projectsStore);

const userStore = useUserStore();
const { profile, isAdminMode } = storeToRefs(userStore);

// @@TODO: вынести везде нотификации в стор
const notification = ref({
  text: '',
  visible: false,
  timeout: 5000
});

watch(isAdminMode, async () => {
  try {
    await projectsStore.init();
  } catch (error) {
    // @ts-ignore
    notification.value.text = error.message;
    notification.value.visible = true;
  }
});

const onLogout = () => {
  keyclockController.logout();
};
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

.projectLoader {
  &:deep() {
    .v-skeleton-loader__list-item-avatar {
      flex-direction: column;
      flex-wrap: nowrap;
      gap: 8px;
    }

    .v-skeleton-loader__bone {
      margin: 0;
    }

    .v-skeleton-loader__avatar {
      width: 32px;
      height: 32px;
      border-radius: 12px;
    }

    .v-skeleton-loader__text {
      width: 100px;
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

.adminSwitch {
  width: 28px;
  height: 30px;
}

.adminSwitchLabel {
  font-size: 0.9em;
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
@/utils/auth
