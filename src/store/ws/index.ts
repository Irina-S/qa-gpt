import { defineStore } from 'pinia';

import { stompClient } from '@/api/stomp';

import type { WsStoreConnectParams, WsStoreState } from './types';
import { useUserStore } from '@/store//user';

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

      window.onclose = () => this.disconnect();
    },
    // @@TODO: избавиться от any
    subscribeToMessages(topicId: string, receiveCb: (...args: any[]) => void) {
      // @@TODO: возможно из за этой строчки стоит прееделать весь ws store в стиле composition api для единого стиля
      const userStore = useUserStore();
      const { profile } = userStore;
      const { id = '' } = profile;

      this.stompClient.subscribe(
        `/topic/messages/${topicId}`,
        (messageData) => receiveCb(JSON.parse(messageData.body)),
        { id }
      );
    },
    unsubsribeFromMessages(topicId: string) {
      this.stompClient.unsubscribe(`/topic/messages/${topicId}`);
    },
    sendMessage(topicId: string, message: string) {
      this.stompClient.publish({
        destination: `/app/${topicId}/createMessage`,
        body: message
      });
    },
    async disconnect() {
      await this.stompClient.deactivate();
      this.isConnected = false;
    }
  }
});
