export interface MessageInThread {
  messageId: string;
  whoWroteMessage: 'User' | 'Assistant';
  messageDateTime: string;
  messageText: string;
}

export interface CreateMessageInThreadRequest {
  threadId: string;
  message: string;
}

export type CreateMessageInThreadResponse = MessageInThread[];

export type GetMessagesInThreadRequest = string;

export type GetMessagesInThreadResponse = MessageInThread[];
