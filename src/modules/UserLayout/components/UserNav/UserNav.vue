<template>
  <v-navigation-drawer :width="100" class="bg-light-blue-darken-3" permanent>
    <v-list nav>
      <v-list-item
        prepend-icon="mdi-folder"
        title="Проект 1"
        to="/project/1"
        class="item py-3"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
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
