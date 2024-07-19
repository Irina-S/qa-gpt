export interface UploadSingleFileRequest {
  filePurposeEnum: 'assistants' | 'vision' | 'batch' | 'fine-tune';
}

export interface UploadSingleFileResponse {
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
