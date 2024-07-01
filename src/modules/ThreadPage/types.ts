export interface MessageInThread {
  id?: string;
  thread_id?: string;
  role: 'user' | 'assistant';
  content: [
    {
      type: string;
      text: {
        value: string;
      };
    }
  ];
}

export type CreateMessageInThreadRequest = MessageInThread[];

export type CreateMessageInThreadResponse = string;

export type GetMessagesInThreadRequest = string;

export type GetMessagesInThreadResponse = MessageInThread[];
