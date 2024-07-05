<template>
  <div class="fill-height d-flex flex-column threadPage">
    <div class="text-h6 px-4 py-2">{{ thread?.name }}</div>

    <v-divider class="my-0" />

    <ChatMessages :messages="messages" :loading="messagesLoading" />

    <v-divider class="my-0" />

    <MessageForm :loading="messagesSending" @send="onSend" />

    <v-snackbar v-model="notification.visible" location="top" multi-line close-on-content-click>
      {{ notification.text }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { inject, ref, watch } from 'vue';

import ChatMessages from './components/ChatMessages/ChatMessages.vue';
import MessageForm from './components/MessageForm/MessageForm.vue';
import { createMessageInThread, getMessagesThread } from './service';
import type { MessageFormContent } from './components/MessageForm/types';

import type { MessageInThread } from './types';
import type { ThreadItem } from '../ProjectPage/types';

const route = useRoute();

const notification = ref({
  visible: false,
  text: '',
  timeout: 3000
});

const messages = ref<MessageInThread[]>([]);
const messagesLoading = ref(false);
const messagesSending = ref(false);

// @ts-ignore
const { thread }: { thread: ThreadItem } = inject('thread');

const onSend = async (form: MessageFormContent) => {
  try {
    const userMessage: MessageInThread[] = [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: {
              value: form.content
            }
          }
        ]
      }
    ];

    messages.value.unshift(...userMessage);

    messagesSending.value = true;

    const { data } = await createMessageInThread(route.params.threadId as string, userMessage);

    const assitantMessage: MessageInThread[] = [
      {
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: {
              value: data
            }
          }
        ]
      }
    ];

    messages.value.unshift(...assitantMessage);
  } catch (error) {
    notification.value.text = error as string;
    notification.value.visible = true;
  } finally {
    messagesSending.value = false;
  }
};

const loadMessages = async () => {
  try {
    messagesLoading.value = true;
    const { data } = await getMessagesThread(route.params?.threadId as string);
    messages.value = [...data];
  } catch (error) {
    notification.value.text = error as string;
    notification.value.visible = true;
  } finally {
    messagesLoading.value = false;
  }
};

watch(() => route.params?.threadId, loadMessages, { immediate: true });
</script>

<style scoped lang="scss">
.threadPage {
  max-height: 100vh;
}
</style>
