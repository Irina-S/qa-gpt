import { $api } from '@/config/api';
import type {
  DeleteFileRequest,
  DeleteFileResponse,
  LinkFileToProjectRequest,
  LinkFileToProjectResponse,
  uploadSingleFileInProjectRequest,
  uploadSingleFileInProjectResponse
} from './types';

export const uploadSingleFileInProject = (params: uploadSingleFileInProjectRequest, file: File) => {
  const formData = new FormData();
  formData.append('multipartFile', file);

  return $api.post<uploadSingleFileInProjectResponse>(
    `/uploadSingleFileInProject?filePurposeEnum=${params.filePurposeEnum}&projectId=${params.projectId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
};

export const linkFileToProject = (params: LinkFileToProjectRequest) => {
  return $api.put<LinkFileToProjectResponse>(
    `/linkFileToProject?projectId=${params.projectId}&fileId=${params.fileId}`
  );
};

export const getFileContent = (fileId: string) => {
  return $api.get<string>(`/getFileContent/${fileId}`);
};

export const deleteSingleFile = (params: DeleteFileRequest) => {
  return $api.delete<DeleteFileResponse>(`/deleteFile/${params.file_id}`);
};
