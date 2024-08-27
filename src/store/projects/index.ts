import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Project, ProjectThread } from '@/types/common';

import { getProjectsList } from './service';

export const useProjectsStore = defineStore('project', () => {
  const projects = ref<Project[]>();

  const project = ref<Project>();
  const projectThreads = computed(() => project.value?.projectThreads ?? []);
  const projectFiles = computed(() => project.value?.projectFiles);

  const thread = ref<ProjectThread>();

  async function loadProjects() {
    const { data } = await getProjectsList();
    projects.value = data;
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

  return { projects, project, projectThreads, projectFiles, init, setProject, thread, setThread };
});
