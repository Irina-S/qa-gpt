import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getAllProjectThreads } from '@/services/thread';

import type { ProjectThreadWithName } from '@/services/thread/types';

export const useThreadsStore = defineStore('threads', () => {
  const threads = ref<ProjectThreadWithName[]>([]);
  const isLoading = ref(false);

  const thread = ref<ProjectThreadWithName>();

  async function loadThreads(projectId: string) {
    try {
      isLoading.value = true;
      const { data } = await getAllProjectThreads(projectId);
      threads.value = data.map((tr) => tr.threadDto);
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  function setThreadWithName(newThread?: ProjectThreadWithName) {
    thread.value = newThread;
  }

  return { thread, threads, isLoading, setThreadWithName, loadThreads };
});
