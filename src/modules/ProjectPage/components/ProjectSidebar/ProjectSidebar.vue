<template>
  <v-navigation-drawer location="right" permanent class="projectSidebar">
    <v-list density="compact" class="py-0">
      <v-list-item-title class="font-weight-bold px-4 py-4">Файлы проекта</v-list-item-title>

      <template v-if="projectFiles?.length">
        <v-list-item
          v-for="file in projectFiles"
          :key="file.fileId"
          :title="file.fileName"
          class="fileItem py-1 ml-6"
          @click="downLoadFile(file)"
        />
      </template>
      <v-list-item v-else title="Файлов пока нет" class="fileItem py-1 ml-6" />

      <v-list-item
        title="Добавить файлы"
        prepend-icon="mdi-paperclip"
        class="fileItem addBtn py-1 mt-4"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useProjectStore } from '@/modules/ProjectPage';
import { getFileContent } from '@/services/file';
import { download } from '@/shared/utils/files';

import type { ProjectFile } from '../../types';

const projectStore = useProjectStore();
const { projectFiles } = storeToRefs(projectStore);

const notification = ref({
  text: '',
  visible: false,
  timeout: 5000
});

const downLoadFile = async (file: ProjectFile) => {
  try {
    const { data } = await getFileContent(file.fileId);
    download(file.fileName, data);
  } catch (error) {
    notification.value.text = error as string;
    notification.value.visible = true;
  }
};
</script>

<style lang="scss" scoped>
.projectSidebar {
  border: none !important;
}

.fileItem {
  min-height: unset !important;

  :deep() {
    .v-list-item-title {
      font-size: 13px;
      font-weight: 600;
    }
  }
}

.addBtn {
  :deep() {
    .v-list-item__prepend {
      font-size: 13px;
      max-width: 16px;
      margin-right: 8px;
    }
  }
}
</style>
