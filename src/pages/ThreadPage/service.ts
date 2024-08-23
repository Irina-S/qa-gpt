import { $api } from '@/api/axios';
import { type GetMessagesInThreadResponse, type GetMessagesInThreadRequest } from './types';

export const getMessagesInThread = (threadId: GetMessagesInThreadRequest) => {
  return $api.get<GetMessagesInThreadResponse>(`/${threadId}/listMessagesInThread/`);
};
