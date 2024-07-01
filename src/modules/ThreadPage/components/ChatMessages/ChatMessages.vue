<template>
  <div
    class="flex-grow-1 px-4 py-2 overflow-y-auto d-flex"
    :class="{
      'flex-column-reverse align-stretch': !loading && hasMessages,
      'justify-center align-center': loading || !hasMessages
    }"
  >
    <template v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="light-blue-darken-3"
        indeterminate
      ></v-progress-circular>
    </template>

    <template v-else-if="hasMessages">
      <template v-for="(msg, i) in computedMessages" :key="i">
        <div :class="{ 'd-flex flex-row-reverse': msg.me }">
          <v-chip
            :color="msg.me ? 'primary' : ''"
            :rounded="10"
            style="height: auto; white-space: normal"
            class="pa-4 mb-2 message"
          >
            <vue3-markdown-it :source="msg.content" />
          </v-chip>
        </div>
      </template>
    </template>

    <div v-else class="text-subtitle-1">Сообщений пока нет</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VueMarkdownIt from 'vue3-markdown-it';

import type { ChatMessagesProps } from './types';

const props = defineProps<ChatMessagesProps>();

const hasMessages = computed(() => Boolean(props.messages?.length));

const computedMessages = computed(() =>
  props.messages?.map((msg) => ({
    id: msg?.id ?? '',
    content: msg.content[0].text.value,
    me: msg.role === 'user'
  }))
);
</script>

<style lang="scss" scoped>
.message {
  border-radius: 24px;

  &::v-deep(.v-chip__content) {
    white-space: pre-wrap;
  }
}
</style>
