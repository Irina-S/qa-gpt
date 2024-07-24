<template>
  <v-navigation-drawer location="right" permanent class="projectSidebar">
    <v-list density="compact" class="py-0">
      <v-list-item-title class="font-weight-bold px-4 py-4">Файлы проекта</v-list-item-title>

      <template v-if="projectFiles?.length">
        <v-list-item
          v-for="file in projectFiles"
          :key="file.fileId"
          :title="file.fileName"
          class="fileItem cursor-pointer py-1 ml-6"
        >
          <v-menu activator="parent" class="actionMenu">
            <v-list density="compact" class="actionList">
              <v-list-item density="compact" @click="downLoadFile(file)"> Скачать </v-list-item>
              <v-list-item density="compact" @click="deleteFile(file)"> Удалить </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>
      </template>
      <v-list-item v-else title="Файлов пока нет" class="fileItem py-1 ml-6" />

      <v-list-item
        :disabled="isSending"
        title="Добавить файлы"
        prepend-icon="mdi-paperclip"
        class="fileItem addBtn py-1 mt-4"
        @click="onFileUploadClick"
      />
    </v-list>

    <v-snackbar v-bind="notification" />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useProjectStore } from '@/modules/ProjectPage';
import {
  getFileContent,
  linkFileToProject,
  uploadSingleFile,
  deleteSingleFile
} from '@/services/file';
import { download } from '@/shared/utils/files';

import type { ProjectFile } from '../../types';

const projectStore = useProjectStore();
const { project, projectFiles } = storeToRefs(projectStore);
const { init } = projectStore;

const notification = ref({
  text: '',
  visible: false,
  timeout: 5000
});

const isSending = ref(false);

const downLoadFile = async (file: ProjectFile) => {
  try {
    const { data } = await getFileContent(file.fileId);
    download(file.fileName, data);
  } catch (error) {
    notification.value.text = JSON.stringify(error) as string;
    notification.value.visible = true;
  }
};

const deleteFile = async (file: ProjectFile) => {
  try {
    await deleteSingleFile({
      file_id: file.fileId
    });

    init();

    notification.value.text = 'Файл удален!';
    notification.value.visible = true;
  } catch (error) {
    notification.value.text = JSON.stringify(error) as string;
    notification.value.visible = true;
  }
};

const onFileInput = async (e: Event) => {
  // @ts-ignore
  const files = [...e.target.files];

  try {
    isSending.value = true;
    const fileInfo = await Promise.all(
      files.map((file) => uploadSingleFile({ filePurposeEnum: 'assistants' }, file))
    );
    await Promise.all(
      fileInfo.map((file) =>
        linkFileToProject({
          projectId: project.value?.projectId ?? '',
          fileId: file.data.fileDto.fileId
        })
      )
    );
    init();
  } catch (error) {
    notification.value.text = JSON.stringify(error) as string;
    notification.value.visible = true;
  } finally {
    isSending.value = false;
  }
};

const onFileUploadClick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.onchange = onFileInput;
  input.click();
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

.actionMenu {
  &::v-deep {
    .v-overlay__content {
      min-width: 100px !important;
    }

    .v-list {
      border-radius: 14px !important;
    }
  }
}

.actionList {
  &::v-deep {
    .v-list-item {
      min-height: 24px;
      font-weight: 500;
      font-size: 11px !important;
      padding: 4px 8px !important;
    }
  }
}
</style>
