import type { ProjectAssistant, ProjectThread } from '@/types/common';

export interface GetAllProjectThreads {
  projectId: string;
}

export type GetAllProjectThreadsResponse = ThreadDto[];

export interface ProjectThreadWithName extends ProjectThread {
  threadName: string;
}

interface ThreadDto {
  threadDto: ProjectThreadWithName;
}
