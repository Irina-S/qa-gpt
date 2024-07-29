import { $api } from '@/components/config/api';
import {
  type GetMessagesInThreadResponse,
  type CreateMessageInThreadRequest,
  type CreateMessageInThreadResponse,
  type GetMessagesInThreadRequest
} from './types';

export const createMessageInThread = (params: CreateMessageInThreadRequest) => {
  return $api.post<CreateMessageInThreadResponse>(
    `/${params.threadId}/createMessageAndGetAnswer/?message=${params.message}`
  );
};

export const getMessagesInThread = (threadId: GetMessagesInThreadRequest) => {
  return $api.get<GetMessagesInThreadResponse>(`/${threadId}/listMessagesInThread/`);
};
