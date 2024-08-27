<template>
  <div class="fill-height d-flex flex-column threadPage rounded-lg border-sm px-6">
    <div class="threadInfo d-flex justify-space-between pa-6">
      <div class="threadTitle text-h2 mr-auto">
        {{ thread?.threadName ?? '' }}
      </div>
      <v-icon icon="mdi-bell-outline" :size="24" class="iconBtn mr-5" />
      <v-icon icon="mdi-cog-outline" :size="24" class="iconBtn" />
    </div>

    <ChatMessages :messages="messages" :loading="isLoading" />

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
import { getMessagesInThread } from './service';

import { useProjectsStore } from '@/store/projects';
import { useWebSocketStore } from '@/store/ws';
import { useThreadsStore } from '@/store/threads';
import { uploadSingleFileInProject } from '@/services/file';

import type { MessageInThread } from './types';
import type { MessageFormContent } from './components/MessageForm/types';

const route = useRoute();
const { params } = toRefs(route);

const projectsStore = useProjectsStore();
const { project, projectThreads } = storeToRefs(projectsStore);
const { init, setThread } = projectsStore;

const wsStore = useWebSocketStore();

const threadsStore = useThreadsStore();
const { threads, thread } = storeToRefs(threadsStore);
const { setThreadWithName } = threadsStore;

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
        uploadSingleFileInProject({ projectId: project.value?.projectId ?? '' }, file)
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

const sendMessage = (form: MessageFormContent) => {
  if (!form.content.length) {
    return;
  }

  isSending.value = true;
  wsStore.sendMessage(route.params.threadId as string, form.content);
};

const onSend = async (form: MessageFormContent) => {
  sendMessage(form);
  loadFilesToProject(form.files);
};

const loadMessages = async () => {
  try {
    isLoading.value = true;
    const { data } = await getMessagesInThread(params.value.threadId as string);
    messages.value = data;
  } catch (error) {
    // @ts-ignore
    notification.value.text = error?.message ?? 'Ошибка';
    notification.value.visible = true;
  } finally {
    isLoading.value = false;
  }
};

const onRecieveMessage = (message: MessageInThread) => {
  messages.value.push(message);
  isSending.value = false;
};

watch(
  () => params.value.threadId as string,
  (newValue) => {
    isSending.value = false;

    const newThread = projectThreads.value.find((t) => t.threadId === newValue);
    setThread(newThread);

    const newThreadWithName = threads.value.find((t) => t.threadId === newValue);
    setThreadWithName(newThreadWithName);

    loadMessages();
  },
  { immediate: true }
);

watch(
  () => [params.value.threadId as string, wsStore.isConnected],
  (newV, oldV) => {
    console.log('new old value watcher');
    const [threadId, isConnected] = newV;
    const [prevThreadId] = oldV ?? [];

    if (isConnected && prevThreadId) {
      console.log('unsubscibe');
      wsStore.unsubsribeFromMessages(prevThreadId as string);
    }

    if (isConnected && threadId) {
      console.log('sbscribe');
      wsStore.subscribeToMessages(threadId as string, onRecieveMessage);
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.threadPage {
  max-height: 100vh;
  overflow: hidden;
}

.threadInfo {
  background: white;
}

// .threadTitle {
//   overflow: hidden;
//   max-width: 70%;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
</style>
@/utils/const
