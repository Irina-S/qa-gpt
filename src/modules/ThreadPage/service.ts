import { $api } from '@/components/config/api';
import {
  type GetMessagesInThreadResponse,
  type CreateMessageInThreadRequest,
  type CreateMessageInThreadResponse,
  type GetMessagesInThreadRequest
} from './types';

export const createMessageInThread = (threadId: string, params: CreateMessageInThreadRequest) => {
  return $api.post<CreateMessageInThreadResponse>(`/${threadId}/messagingInThread`, params);
};

export const getMessagesInThread = (threadId: GetMessagesInThreadRequest) => {
  return $api.get<GetMessagesInThreadResponse>(`/${threadId}/listMessagesInThread`);
};
