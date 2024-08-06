import { $api } from '@/config/api';
import { type GetMessagesInThreadResponse, type GetMessagesInThreadRequest } from './types';

export const getMessagesInThread = (threadId: GetMessagesInThreadRequest) => {
  return $api.get<GetMessagesInThreadResponse>(`/${threadId}/listMessagesInThread/`);
};
