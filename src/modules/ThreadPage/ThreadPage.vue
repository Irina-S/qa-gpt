<template>
  <div class="fill-height d-flex flex-column threadPage">
    <v-list-item :ripple="false" class="threadInfo" lines="two">
      <template v-slot:prepend>
        <v-avatar class="avatar" :size="48" color="pink-lighten-2">
          <v-icon icon="mdi-shape" :size="24" />
        </v-avatar>
      </template>

      <v-list-item-title class="title">{{ thread?.threadId }}</v-list-item-title>
    </v-list-item>

    <ChatMessages :messages="messages" :loading="false" />

    <MessageForm :loading="isSending" @send="onSend" />

    <v-snackbar
      v-model="notification.visible"
      :timeout="notification.timeout"
      :text="notification.text"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch, toRefs } from 'vue';
import { storeToRefs } from 'pinia';

import ChatMessages from './components/ChatMessages/ChatMessages.vue';
import MessageForm from './components/MessageForm/MessageForm.vue';
import { createMessageInThread, getMessagesInThread } from './service';

import { useProjectStore } from '@/modules/ProjectPage/';
import { uploadSingleFileInProject, linkFileToProject } from '@/services/file';

import type { MessageInThread } from './types';
import type { MessageFormContent } from './components/MessageForm/types';

const route = useRoute();
const { params } = toRefs(route);
// const { threadId } = toRefs(params.value);

const projectStore = useProjectStore();
const { project, projectThreads, thread } = storeToRefs(projectStore);
const { init, setThread } = projectStore;

const messages = ref<MessageInThread[]>([]);
const isSending = ref(false);
const isLoading = ref(false);

const notification = ref({
  text: '',
  visible: false,
  timeout: 5000
});

const loadFilesToProject = async (files: File[]) => {
  if (!files.length) {
    return;
  }

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
    notification.value.text = JSON.stringify(error) as string;
    notification.value.visible = true;
  } finally {
    isSending.value = false;
  }
};

const sendMessage = async (form: MessageFormContent) => {
  if (!form.content.length) {
    return;
  }
  try {
    const userMessage: Pick<MessageInThread, 'message'> = {
      message: form.content
    };
    isSending.value = true;
    const { data } = await createMessageInThread(route.params.threadId as string, userMessage);
    messages.value = [...data.messages];
  } catch (error) {
    notification.value.text = JSON.stringify(error) as string;
    notification.value.visible = true;
  } finally {
    isSending.value = false;
  }
};

const onSend = async (form: MessageFormContent) => {
  await Promise.all([sendMessage(form), loadFilesToProject(form.files)]);
};

const loadMessages = async () => {
  try {
    isLoading.value = true;
    const { data } = await getMessagesInThread(params.value.threadId as string);
    messages.value = [...data.messages];
  } catch (error) {
    notification.value.text = error as string;
    notification.value.visible = true;
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => params.value.threadId,
  (newValue) => {
    const newThread = projectThreads.value.find((t) => t.threadId === newValue);
    setThread(newThread);

    loadMessages();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.threadPage {
  max-height: 100vh;
}

.threadInfo {
  background: white;

  .title {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .subtitle {
    font-size: 11px;
    color: var(--color-text-grey) !important;
  }

  .avatar {
    color: white;
    font-size: 24px;
  }
}
</style>
