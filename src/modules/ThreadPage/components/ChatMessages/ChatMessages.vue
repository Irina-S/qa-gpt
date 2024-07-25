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
        class="progress"
        indeterminate
      ></v-progress-circular>
    </template>

    <template v-else-if="hasMessages">
      <template v-for="(msg, i) in computedMessages" :key="i">
        <div :class="{ 'd-flex flex-row-reverse': msg.me }">
          <v-chip variant="text" :class="['pt-4 pb-5 px-5 mb-2 message', { my: msg.me }]">
            <vue-markdown-it :source="msg.content" :html="true" :linkify="true" />
          </v-chip>
        </div>
      </template>
    </template>

    <div v-else>Сообщений пока нет</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// @ts-ignore
import VueMarkdownIt from 'vue3-markdown-it';

import type { ChatMessagesProps } from './types';

const props = defineProps<ChatMessagesProps>();

const hasMessages = computed(() => Boolean(props.messages?.length));

const computedMessages = computed(() =>
  props.messages?.map((msg, idx) => ({
    id: idx,
    content: msg.message,
    me: msg.whoWroteMessage === 'user'
  }))
);
</script>

<style lang="scss" scoped>
.progress {
  &:deep() {
    .v-progress-circular__overlay {
      stroke: var(--color-primary) !important;
    }
  }
}

.message {
  border-radius: 4px 16px 16px 16px;
  background: var(--color-bg-grey);
  height: auto;
  white-space: normal;

  &.my {
    border-radius: 16px 4px 16px 16px;
    background-color: #9351ff40 !important;
  }

  &::v-deep {
    pre {
      white-space: pre-wrap;
    }

    ul,
    ol {
      list-style-position: inside;
    }

    table {
      border-collapse: collapse;
    }

    th {
      background-color: white;
      font-weight: 500;
    }

    th,
    td {
      border: 1px solid rgb(202, 202, 202);
      padding: 4px 8px;
    }
  }
}
</style>
