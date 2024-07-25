<template>
  <v-navigation-drawer location="right" permanent class="rounded-lg pa-6">
    <h2 class="text-h2 mb-6">Файлы проекта</h2>

    <v-btn
      :ripple="false"
      variant="flat"
      block
      prepend-icon="mdi-paperclip"
      class="uploadBtn secondary mb-8"
      @click="onFileUploadClick"
    >
      Добавить файлы</v-btn
    >

    <v-list v-if="projectFiles?.length" class="pa-0">
      <v-list-item
        v-for="file in projectFiles"
        :key="file.fileId"
        :title="file.fileName"
        prepend-icon="mdi-file-outline"
        class="fileItem cursor-pointer pa-1 ga-2 rounded"
      >
        <div class="actionMenu rounded bg-white d-flex ga-1 pa-2 ml-2">
          <v-icon
            icon="mdi-tray-arrow-down"
            :size="16"
            class="iconBtn"
            @click="downLoadFile(file)"
          />
          <v-icon
            icon="mdi-trash-can-outline"
            :size="16"
            class="iconBtn"
            @click="deleteFile(file)"
          />
        </div>
      </v-list-item>
    </v-list>
    <div v-else class="mt-4">Файлов пока нет</div>

    <v-snackbar
      v-model="notification.visible"
      :timeout="notification.timeout"
      :text="notification.text"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useProjectStore } from '@/modules/ProjectPage';
import { getFileContent, uploadSingleFileInProject, deleteSingleFile } from '@/services/file';
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
    // @ts-ignore
    notification.value.text = error?.message ?? 'Ошибка';
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
    // @ts-ignore
    notification.value.text = error?.message ?? 'Ошибка';
    notification.value.visible = true;
  }
};

const onFileInput = async (e: Event) => {
  // @ts-ignore
  const files = [...e.target.files];

  try {
    isSending.value = true;
    await Promise.all(
      files.map((file) =>
        uploadSingleFileInProject(
          { filePurposeEnum: 'assistants', projectId: project.value?.projectId ?? '' },
          file
        )
      )
    );

    notification.value.text = 'Файл(ы) загружены!';
    notification.value.visible = true;

    init();
  } catch (error) {
    // @ts-ignore
    notification.value.text = error?.message ?? 'Ошибка';
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
.fileItem {
  min-width: unset !important;
  min-height: unset !important;
  border-radius: 8px !important;
  grid-template-columns: 24px 1fr auto;

  &:hover {
    background-color: var(--color-bg-grey-hover);

    .actionMenu {
      opacity: 1;
      pointer-events: all;
    }
  }

  &:deep() {
    .v-list-item__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .v-list-item__prepend {
      min-width: none !important;

      .v-icon {
        font-size: 24px;
        color: var(--color-text);
        opacity: 1 !important;
      }
    }
  }
}

.uploadBtn {
  :deep() {
    .v-icon {
      transform: rotate(45deg);
    }
  }
}

.actionMenu {
  opacity: 0;
  pointer-events: none;
}
</style>
