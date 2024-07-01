import type { MessageInThread } from '../../types';

export interface ChatMessagesProps {
  messages?: MessageInThread[];
  loading?: boolean;
}

export interface LocalMessageItem {
  id?: string;
  content: string;
  me: boolean;
}
