<template>
  <v-navigation-drawer permanent>
    <v-list density="compact" line="2">
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1" :size="32">
            <v-icon :size="18" color="white">mdi-view-dashboard</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title>Dashboard</v-list-item-title>
        <v-list-item-subtitle>Description</v-list-item-subtitle>
      </v-list-item>
      <v-divider class="my-0" />

      <template v-for="(item, index) in parents" :key="`parent${index}`">
        <v-list-item :to="`/project/${projectId}/thread/${item.id}`">
          <template v-slot:prepend>
            <v-avatar color="grey-lighten-1" :size="32">
              <v-icon :size="18" color="white">mdi-message</v-icon>
            </v-avatar>
          </template>

          <v-list-item-content>
            <v-list-item-title>Новый контекст {{ item.id }}</v-list-item-title>
            <v-list-item-subtitle>Description</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-0" />
      </template>
    </v-list>

    <v-fab icon="mdi-chat-plus-outline" color="light-blue-darken-1" class="fab"></v-fab>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const { params } = route;
const { projectId } = params;

const parents = [
  {
    id: 1,
    title: 'Новый контекст',
    active: true
  },
  {
    id: 3,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 4,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 5,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 6,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 7,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 8,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 9,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 10,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 11,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 12,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 13,
    title: 'Новый контекст',
    active: false
  },
  {
    id: 14,
    title: 'Новый контекст',
    active: false
  }
];
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
