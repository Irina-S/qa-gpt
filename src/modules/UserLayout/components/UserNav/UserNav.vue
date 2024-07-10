<template>
  <v-navigation-drawer :width="100" class="userNav bg-light-blue-darken-3" permanent>
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-folder"
        title="Проект 1"
        to="/project/1"
        class="item py-3"
      ></v-list-item>
    </v-list>

    <v-btn
      icon="mdi-logout"
      variant="text"
      class="align-self-md-center mt-auto mb-4"
      @click="onLogout"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { setLoggedOut } from '@/shared/utils/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const onLogout = () => {
  setLoggedOut();
  router.push({ name: 'login' });
};
</script>

<style lang="scss" scoped>
.userNav {
  &:deep() {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }
}

.item {
  display: flex;
  flex-direction: column;

  &:deep() {
    .v-list-item__spacer {
      display: none;
    }
  }
}
</style>
