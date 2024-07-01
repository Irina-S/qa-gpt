<template>
  <div class="px-4 pt-6 pb-3" @drop.prevent="onDrop">
    <v-textarea
      v-model="messageForm.content"
      placeholder="Введите текст..."
      type="text"
      rows="1"
      variant="outlined"
      prepend-icon="mdi-paperclip"
      no-resize
      hide-details
      class="mb-4"
      @click:prepend="onFileUploadClick"
    >
      <template #append>
        <v-progress-circular
          v-if="loading"
          :size="24"
          :width="3"
          color="light-blue-darken-3"
          indeterminate
        />
        <v-icon v-else :size="24" color="light-blue-darken-4" @click="onSend">mdi-send</v-icon>
      </template>
    </v-textarea>

    <v-file-input
      v-if="files.length"
      v-model="files"
      clear-icon="mdi-close"
      multiple
      hide-details
      class="file"
    >
      <template v-slot:selection="{ fileNames }">
        <template v-for="fileName in fileNames" :key="fileName">
          <v-chip
            label
            color="blue-grey-darken-2"
            size="x-large"
            prepend-icon="mdi-file"
            class="cursor-pointer"
          >
            {{ fileName }}
          </v-chip>
        </template>
      </template>
    </v-file-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { type MessageFormContent, type MessageFormEmits, type MessageFormProps } from './types';

defineProps<MessageFormProps>();

const emit = defineEmits<MessageFormEmits>();

const files = ref<File[]>([]);

const onDrop = (e: DragEvent) => {
  if (e.dataTransfer?.files) {
    files.value = [...e.dataTransfer.files];
  }
};

const onFileInput = (e: Event) => {
  // @ts-ignore
  files.value = [...e.target.files];
};

const onFileUploadClick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.onchange = onFileInput;
  input.click();
};

const messageForm = ref<MessageFormContent>({
  content: ''
});

const onSend = () => {
  emit('send', messageForm.value);
  messageForm.value.content = '';
};
</script>

<style lang="scss" scoped>
.file {
  &:deep() {
    .v-input__prepend,
    .v-field__outline,
    .v-field__loader {
      display: none;
    }

    .v-field {
      padding: 0;
    }

    .v-field__input {
      padding: 0;
      flex-direction: column;
      align-items: flex-start;

      .v-chip {
        height: 36px;
        padding: 4px 12px;
      }
    }

    .v-field--variant-filled .v-field__overlay {
      opacity: 0;
    }

    .v-field__clearable {
      opacity: 1;
    }

    .v-input {
      padding: 0;
    }
  }
}
</style>
