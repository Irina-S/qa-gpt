export interface ProjectFile {
  fileId: string;
  openAiFileId: string;
  fileName: string;
  content: string[];
}

export interface Project {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectAssistants: ProjectAssistant[];
  projectThreads: ProjectThread[];
  projectFiles: ProjectFile[];
}

export interface ProjectAssistant {
  assistantId: string;
  openAiAssistantId: string;
}

export interface ProjectThread {
  threadId: string;
  openAiThreadId: string;
  assistant: ProjectAssistant;
  project?: string;
}
