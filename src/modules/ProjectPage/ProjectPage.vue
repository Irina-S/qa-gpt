<template>
  <ThreadNav :threads="threads" @create="onCreateThread" @select="onSelectThread" />
  <ProjectSidebar />

  <v-main class="d-flex align-stretch flex-column" style="min-height: 100vh">
    <RouterView v-if="isThreadSelected" />
    <NoThreadText v-else />
  </v-main>

  <v-snackbar v-model="notification.visible" location="top" close-on-content-click>
    {{ notification.text }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import { computed, onMounted, provide, ref } from 'vue';

import ThreadNav from './components/ThreadNav/ThreadNav.vue';
import ProjectSidebar from './components/ProjectSidebar/ProjectSidebar.vue';
import NoThreadText from './components/NoThreadText/NoThreadText.vue';
import { createThread } from './service';

import { type ThreadItem } from './types';

const route = useRoute();
const router = useRouter();

const isThreadSelected = computed(() => Boolean(route.params.threadId));

const THREADS_LOCAL_STORAGE_KEY = 'threads';
const threads = ref<ThreadItem[]>([]);
const thread = ref<ThreadItem>();

const updateThread = (nValue: ThreadItem) => {
  thread.value = nValue;
};

provide('thread', { thread, updateThread });

const saveThread = (threadName: string, threadId: string) => {
  const thread = {
    id: threadId,
    name: threadName
  };
  threads.value.push(thread);
  localStorage.setItem(THREADS_LOCAL_STORAGE_KEY, JSON.stringify(threads.value));

  updateThread(thread);
};

const loadThreads = () => {
  const threadsSaved = localStorage.getItem(THREADS_LOCAL_STORAGE_KEY);
  if (threadsSaved) {
    threads.value = JSON.parse(threadsSaved);
  }
};

const notification = ref({
  visible: false,
  text: '',
  timeout: 3000
});

const onCreateThread = async (threadName: string) => {
  try {
    const { data: threadId } = await createThread();

    notification.value.text = `Создан контекст ${threadName}`;
    notification.value.visible = true;

    saveThread(threadName, threadId);

    router.push(`/project/${route.params.projectId}/thread/${threadId}`);
  } catch (error) {
    notification.value.text = error as string;
    notification.value.visible = true;
  }
};

const onSelectThread = (thread: ThreadItem) => {
  updateThread(thread);
  router.push(`/project/${route.params.projectId}/thread/${thread.id}`);
};

onMounted(loadThreads);
</script>
