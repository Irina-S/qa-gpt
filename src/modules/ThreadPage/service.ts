import { $api } from '@/config/api';
import type {
  CreateMessageInThreadRequest,
  CreateMessageInThreadResponse,
  CreateThreadResponse
} from './types';

export const createThread = () => {
  return $api.get<CreateThreadResponse>('/createThread');
};

export const createMessageInThread = (params: CreateMessageInThreadRequest) => {
  return $api.get<CreateMessageInThreadResponse>('/createMessageInThread'), { params };
};
