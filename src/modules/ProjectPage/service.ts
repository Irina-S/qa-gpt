import { $api } from '@/config/api';
import type { CreateThreadResponse } from './types';

export const createThread = () => {
  return $api.post<CreateThreadResponse>('/createThread');
};
