import { $api } from '@/config/api';
import {
  type GetMessagesInThreadResponse,
  type CreateMessageInThreadRequest,
  type CreateMessageInThreadResponse,
  type GetMessagesInThreadRequest
} from './types';

export const createMessageInThread = (threadId: string, params: CreateMessageInThreadRequest) => {
  return $api.post<CreateMessageInThreadResponse>(
    `/createMessageInThread?thread_id=${threadId}`,
    params
  );
};

export const getMessagesThread = (threadId: GetMessagesInThreadRequest) => {
  return $api.get<GetMessagesInThreadResponse>(`getMessagesThread?thread_id=${threadId}`);
};
