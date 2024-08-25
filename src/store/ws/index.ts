import { defineStore } from 'pinia';

import { stompClient } from '@/api/stomp';

import type { WsStoreConnectParams, WsStoreState } from './types';

export const useWebSocketStore = defineStore('websocket', {
  state: (): WsStoreState => ({
    stompClient,
    isConnected: false
  }),
  actions: {
    connect({ onError }: WsStoreConnectParams) {
      this.stompClient.onConnect = () => {
        this.isConnected = true;
      };

      this.stompClient.onWebSocketError = (error) => {
        onError?.(error);
      };

      this.stompClient.onStompError = (frame) => {
        onError?.(frame.headers['message']);
      };

      this.stompClient.activate();
    },
    // @@TODO: избавиться от any
    subscribeToMessages(topicId: string, receiveCb: (...args: any[]) => void) {
      this.stompClient?.subscribe(`/topic/messages/${topicId}`, (messageData) =>
        receiveCb(JSON.parse(messageData.body))
      );
    },
    sendMessage(topicId: string, message: string) {
      this.stompClient?.publish({
        destination: `/app/${topicId}/createMessage`,
        body: message
      });
    },
    async disconnect() {
      await this.stompClient?.deactivate();
      this.isConnected = true;
    }
  }
});
