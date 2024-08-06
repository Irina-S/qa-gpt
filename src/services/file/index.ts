import { $api } from '@/config/api';
import type {
  DeleteFileRequest,
  DeleteFileResponse,
  LinkFileToProjectRequest,
  LinkFileToProjectResponse,
  UploadSingleFileInProjectRequest,
  UploadSingleFileInProjectResponse
} from './types';

export const uploadSingleFileInProject = (params: UploadSingleFileInProjectRequest, file: File) => {
  const formData = new FormData();
  formData.append('multipartFile', file);

  return $api.post<UploadSingleFileInProjectResponse>(
    `/UploadSingleFileInProject?projectId=${params.projectId}`,
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
