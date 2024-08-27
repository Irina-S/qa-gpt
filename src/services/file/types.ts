import type { Project } from '@/types/common';

export interface UploadSingleFileInProjectRequest {
  projectId: string;
}

export interface UploadSingleFileInProjectResponse {
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
