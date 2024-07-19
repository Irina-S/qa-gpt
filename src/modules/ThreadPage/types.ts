export interface MessageInThread {
  whoWroteMessage: 'user' | 'assistant';
  message: string;
}

export interface CreateMessageInThreadRequest {
  message: string;
}

export interface CreateMessageInThreadResponse {
  messages: MessageInThread[];
}

export type GetMessagesInThreadRequest = string;

export interface GetMessagesInThreadResponse {
  messages: MessageInThread[];
}
