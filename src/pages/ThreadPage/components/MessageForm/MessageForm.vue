<template>
  <div class="px-6 pt-6 pb-4" @drop.prevent="onDrop">
    <v-textarea
      v-model="messageForm.content"
      :max-rows="5"
      autofocus
      variant="solo-filled"
      placeholder="Введите текст..."
      color="var(--color-text-secondary)"
      type="text"
      rows="1"
      no-resize
      hide-details
      auto-grow
      class="textarea"
      @keydown.enter.exact.prevent="onSend"
      @keydown.enter.shift.exact.prevent="messageForm.content += '\n'"
    >
      <template #prepend-inner>
        <v-icon
          :size="24"
          icon="mdi-paperclip"
          class="iconBtn fileBtn"
          @click="onFileUploadClick"
        />
      </template>
      <template #append-inner>
        <v-progress-circular v-if="loading" :size="24" :width="3" indeterminate class="loadingBtn" />
        <v-icon v-else :size="24" class="iconBtn" @click="onSend">mdi-send</v-icon>
      </template>
    </v-textarea>

    <v-file-input
      v-if="files.length"
      v-model="files"
      clear-icon="mdi-close"
      multiple
      hide-details
      class="file mt-3"
    >
      <template v-slot:selection="{ fileNames }">
        <template v-for="fileName in fileNames" :key="fileName">
          <v-chip size="small" prepend-icon="mdi-file-outline" class="cursor-pointer">
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
  content: '',
  files: []
});

const onSend = () => {
  emit('send', { ...messageForm.value, files: files.value });
  messageForm.value.content = '';
  files.value = [];
};
</script>

<style lang="scss" scoped>
.textarea {
  &:deep() {
    .v-field {
      border-radius: 28px;
      box-shadow: none !important;
    }

    .v-icon {
      opacity: 1 !important;
    }
  }
}

.fileBtn {
  transform: rotate(45deg);
}

.loadingBtn {
  color: var(--color-primary);
}

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
      min-height: unset !important;
      opacity: 1 !important;
      padding: 0;
      flex-direction: column;
      align-items: flex-start;

      .v-chip {
        font-size: 12px;
        color: var(--color-primary) !important;
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

    .mdi-close {
      opacity: 1 !important;
      font-size: 16px !important;
      color: var(--color-text) !important;

      &:hover {
        color: var(--color-primary) !important;
      }
    }
  }
}
</style>
