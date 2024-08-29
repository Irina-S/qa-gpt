import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

import { getProjectsList } from '@/services/project';

import { useUserStore } from '@/store/user';

import type { Project, ProjectThread } from '@/types/common';

export const useProjectsStore = defineStore('project', () => {
  const userStore = useUserStore();
  const { isAdminMode } = storeToRefs(userStore);

  const isLoading = ref(false);

  const projects = ref<Project[]>();

  const project = ref<Project>();
  const projectThreads = computed(() => project.value?.projectThreads ?? []);
  const projectFiles = computed(() => project.value?.projectFiles);

  const thread = ref<ProjectThread>();

  async function loadProjects() {
    try {
      isLoading.value = true;
      const { data } = await getProjectsList(isAdminMode.value);
      projects.value = data;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function init() {
    await loadProjects();

    if (projects.value?.length) {
      setProject(projects.value[0]);
    }
  }

  function setProject(newProject?: Project) {
    project.value = newProject;
  }

  function setThread(newThread?: ProjectThread) {
    thread.value = newThread;
  }

  return {
    projects,
    project,
    projectThreads,
    projectFiles,
    init,
    setProject,
    thread,
    setThread,
    isLoading
  };
});
