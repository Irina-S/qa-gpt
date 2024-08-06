export interface MessageInThread {
  messageId: string;
  whoWroteMessage: 'USER' | 'ASSISTANT';
  messageDateTime: string;
  messageText: string;
}

export type GetMessagesInThreadRequest = string;

export type GetMessagesInThreadResponse = MessageInThread[];
