<template>
  <div class="fill-height d-flex flex-column">
    <div class="text-h6 px-4 py-3">Контекст {{ route.params?.threadId }}</div>

    <v-divider class="my-0" />

    <div class="flex-grow-1 px-4 py-2 overflow-y-auto d-flex flex-column align-stretch justify-end">
      <template v-for="(msg, i) in messages" :key="i">
        <div :class="{ 'd-flex flex-row-reverse': msg.me }">
          <v-chip
            :color="msg.me ? 'primary' : ''"
            :rounded="10"
            style="height: auto; white-space: normal"
            class="pa-4 mb-2"
          >
            {{ msg.content }}
            <sub class="ml-2" style="font-size: 0.5rem">{{ msg.created_at }}</sub>
          </v-chip>
        </div>
      </template>
    </div>

    <MessageForm />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import MessageForm from './components/MessageForm/MessageForm.vue';

const messages = [
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    me: true,
    created_at: '11:11am'
  },
  {
    content: 'dolor',
    me: false,
    created_at: '11:11am'
  },
  {
    content: 'dolor',
    me: false,
    created_at: '11:11am'
  },
  {
    content: 'dolor',
    me: false,
    created_at: '11:11am'
  },
  {
    content: 'dolor',
    me: true,
    created_at: '11:11am'
  },
  {
    content: 'dolor',
    me: false,
    created_at: '11:11am'
  },
  {
    content: 'dolor',
    me: false,
    created_at: '11:11am'
  }
];

const route = useRoute();
</script>
