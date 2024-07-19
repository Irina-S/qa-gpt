import { $api } from '@/components/config/api';
import type { UploadSingleFileRequest, UploadSingleFileResponse } from './types';

export const createMessageInThread = (params: UploadSingleFileRequest) => {
  return $api.post<UploadSingleFileResponse>(`/uploadSingleFile`, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getFileContent = (fileId: string) => {
  return $api.get<string>(`/getFileContent/${fileId}`);
};
