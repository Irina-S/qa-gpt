import type { Project } from '@/modules/ProjectPage/types';

export interface UploadSingleFileRequest {
  filePurposeEnum: 'assistants' | 'vision' | 'batch' | 'fine-tune';
}

export interface UploadSingleFileResponse {
  fileDto: {
    fileId: string;
  };
  file: {
    id: string;
    object: string;
    bytes: number;
    filename: string;
    purpose: string;
    status: string;
    created_at: number;
    status_details: string;
  };
}

export interface DeleteFileRequest {
  file_id: string;
}

export interface DeleteFileResponse {
  id: string;
  object: string;
  deleted: boolean;
}

export interface LinkFileToProjectRequest {
  projectId: string;
  fileId: string;
}

export type LinkFileToProjectResponse = Project;
